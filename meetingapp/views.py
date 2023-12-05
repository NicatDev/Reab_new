from django.shortcuts import render, redirect, get_object_or_404
from meetingapp.models import *
from django.http import JsonResponse
from datetime import date,timedelta,datetime
from meetingapp.forms import Messageform,Surveyform,CustomUserCreationForm
from django.http import HttpResponse
import json
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.core.mail import send_mail
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.urls import reverse
from django.conf import settings
from django.contrib.auth import login as auth_login
from meetingapp.utils import code_slug_generator,validateEmail
from django.contrib.auth.decorators import login_required
import pytz
from django.http import JsonResponse
import calendar
from django.db.models import Q,F,FloatField,Count
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.http import JsonResponse
def logout_view(request):
    logout(request)
    return redirect('home')


def meetjoin(request,meet):
    mymeet = Meeting.objects.get(id=meet)
    zoom_url = mymeet.meeting_id
    url_parts = zoom_url.split('/')
   
    if len(url_parts) < 5:
        return JsonResponse({"error": "Invalid Zoom URL"})

    # Extract the meeting ID and password

    password_part = url_parts[-1]
    meeting_id = url_parts[-1].split('?')[0]
    password_parts = password_part.split('=')
    if len(password_parts) < 2:
        return JsonResponse({"error": "Invalid Zoom URL"})
    
    meeting_pwd = password_parts[1].split('.')[0]
    print(meeting_id,meeting_pwd)
    context = {
        'meeting_id':meeting_id,
        'meeting_pwd':meeting_pwd
    }
    return render(request,'index.html',context)

def profile(request):

    context = {}
   
    return render(request,'profile.html',context)



def home(request):
    if Header.objects.all().exists():
        header = Header.objects.first()
    else:
        header = {}
    you = 'early'
    meetings = Meeting.objects.all()
    sportmen = Sportmen.objects.all()
    partners = Partners.objects.all()
    if About.objects.all().exists():
        about = About.objects.first()
    else:
        about = {}
    today = date.today()
    days_in_current_month = calendar.monthrange(today.year, today.month)[1]

    end_week = today + timedelta(days=(7-today.weekday()))

    end_month = today + timedelta(days=(days_in_current_month-today.day))
    headerphotos = Headerphotos.objects.all()
    day_meetings = meetings.filter(date__date=today)
    week_meetings = meetings.filter(date__date__gte=datetime.now(),date__date__lte=end_week).exclude(date__date=today)
    month_meetings = meetings.filter(date__date__gte=datetime.now(),date__date__lte=end_month).exclude(date__date__gte=datetime.now(),date__date__lte=end_week)
    all_meetings = meetings.all()
    if len(all_meetings)>3:
        all_meetings = all_meetings[0:3]
    if meetings.filter(date__gte=datetime.now()).exists():
        nearest_meeting = meetings.filter(date__gte=datetime.now()).order_by('date')[0].date
        
        you = 'late'
        
    else:
        nearest_meeting = 'late'
        
    chrome = False
    if request.user_agent.is_mobile:
        chrome = True
    if request.user_agent.os.family == 'iOS':
        chrome = False

    if request.user_agent.browser.family == 'Mobile Safari':
        chrome = False
    
    if request.user_agent.is_pc:

        chrome = True
    if request.user_agent.os.family  == 'iOS':
  
        chrome = False
    meetnumber = len(Meeting.objects.all())
    eagernumber = len(Eager.objects.all())
    sportmennumber = len(Sportmen.objects.all())
    blogs = Blog.objects.all()
    partners = Partners.objects.all()   
    header_meetings = Meeting.objects.filter(header_exist=True)
    context = {
        'partners':partners,
        'header':header,
        'about':about,
        'sportmen':sportmen,
        'partners':partners,
        'day_meetings':day_meetings,
        'week_meetings':week_meetings,
        'month_meetings':month_meetings,
        'nearest_meeting':nearest_meeting,
        'you':you,
        'meetnumber':meetnumber,
        'eagernumber':eagernumber,
        'sportmennumber':sportmennumber,
        'chrome':chrome,
        'all_meetings':all_meetings,
        'blogs':blogs,
        'header_meetings':header_meetings,
        'headerphotos':headerphotos
    }
    if Head.objects.all().exists():
        head = Head.objects.first()
        context['head'] = head
    return render(request,'season-full.html',context)



def logout_view(request):
    if request.user.is_authenticated:
        logout(request)
        
    next_page = request.GET.get('next', reverse('home'))  # Default to the home page
    return redirect(next_page)

def login(request):
  
    if Header.objects.all().exists():
        header = Header.objects.first()
    else:
        header = {}
        
    meetnumber = len(Meeting.objects.all())
    eagernumber = len(Eager.objects.all())
    sportmennumber = len(Sportmen.objects.all()) 
    
    context = {'header':header,
        'meetnumber':meetnumber,
        'eagernumber':eagernumber,
        'sportmennumber':sportmennumber,

        }
    return render(request,'LogReg.html',context)



def message(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        newmessage = Messageform(data=data)
        if data.get('message') == '':
            return HttpResponse(status=401)
        if data.get('phone') == '':
            return HttpResponse(status=402)
        if data.get('subject') == '':
            return HttpResponse(status=403)
        if data.get('name') == '':
            return HttpResponse(status=404)
        if data.get('email') == '':
            return HttpResponse(status=405)
        if newmessage.is_valid():
            newmessage.save()
        else:
            return HttpResponse(status=405) 
        data = {'message': 'Data saved successfully'}
        return JsonResponse(data)
    else:
        return HttpResponse(status=405) 

def addorremove(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = User.objects.get(id=data.get('user'))
        meeting = Meeting.objects.get(id=data.get('id'))
        if user in meeting.meeter.all():
            meeting.meeter.remove(user)
            data=Meeting.objects.select_related('meetingowner').filter(meeter=request.user)
          
            json_data = {}


            json_data=list(data.values('date', 'image', 'meetingowner__first_name', 'meetingowner__last_name'))
    
            return JsonResponse({'data':json_data}, status=201)

        else:
            meeting.meeter.add(user)
            data=Meeting.objects.select_related('meetingowner').filter(meeter=request.user)
          
            

            json_data=list(data.values('date', 'image', 'meetingowner__first_name', 'meetingowner__last_name'))

            return JsonResponse({'data':json_data}, status=200)

    else:
        return HttpResponse(status=405) 

def wishlist(request):
    if request.method == 'POST':
        
        if not request.user.is_authenticated:
            return HttpResponse(status=403) 
        data2 = {'message': 'Data saved successfully'}
        
        data = json.loads(request.body)
        user = User.objects.get(id=data.get('user'))
      
        if Meeting.objects.filter(id=data.get('id')).exists():
            meeting = Meeting.objects.get(id=data.get('id'))
        else:
            return HttpResponse(status=403) 
        if meeting in user.meetings.all():
            user.meetings.remove(meeting)
            print('removed')
            return JsonResponse(data2,status=201)
        
        else:
            user.meetings.add(meeting)
            print('added')
            return JsonResponse(data2,status=200)
    else:
        return HttpResponse(status=405) 

def login_register(request):
    myaction = request.GET.get('myaction', reverse('login'))
    myresponse = {'message':'success'}

    if request.method == 'POST':
    
        data = json.loads(request.body)
     
        if myaction == '2':
            
            login_form = AuthenticationForm(request, data=data)
            
            if login_form.is_valid():
                user = login_form.get_user()
                auth_login(request, user)
                
                
                return JsonResponse(myresponse)
            else:
                print(login_form.errors)
                return HttpResponse(status=400) 
                # Replace 'home' with the URL of your home page
        elif myaction == '1':
            registration_form = CustomUserCreationForm(data)
            phone_number = data.pop('phone_number')
            
            if registration_form.is_valid():
                user = registration_form.save()

                user.save()

                eager = Eager(user=user,phone_number=phone_number)
                eager.save()
                auth_login(request, user)
                return JsonResponse(myresponse)
            else:
                print(registration_form.errors)
                
                return HttpResponse(status=400)  
        return HttpResponse(status=200) 
            # Replace 'home' with the URL of your home page
    else:
        return HttpResponse(status=405) 


def survey(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        newmessage = Surveyform(data=data)
        if newmessage.is_valid():
            newmessage.save()
        data = {'message': 'Data saved successfully'}
        return JsonResponse(data)
    else:
        return HttpResponse(status=405) 


def forgot(request):
    if Header.objects.all().exists():
        header = Header.objects.first()
    else:
        header = {}
    meetnumber = len(Meeting.objects.all())
    eagernumber = len(Eager.objects.all())
    sportmennumber = len(Sportmen.objects.all()) 
    
    context = {'header':header,
        'meetnumber':meetnumber,
        'eagernumber':eagernumber,
        'sportmennumber':sportmennumber
        }
    return render(request,'forgot.html',context)


def change_password(request):
    error_data = {
        'error': 'Bad Request',
        'message': 'Wrong username or email'
    }
    data = json.loads(request.body)
    email = data.get('email')
    if data.get('pass') != data.get('confirmpass'):
        return JsonResponse(error_data,status=401)
    password = data.get('pass')
    if User.objects.filter(email = email).exists():
        user = User.objects.get(email = email)
    elif User.objects.filter(username = email).exists():
        user = User.objects.get(username = email)
    else:
        return JsonResponse(error_data,status=404)
    user.set_password(password)
    user.save()
    return JsonResponse({'message':True},status=200)

def check_password(request):
    error_data = {
        'error': 'Bad Request',
        'message': 'Wrong username or email'
    }
    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('pass')
    if User.objects.filter(email = email).exists():
        user = User.objects.get(email = email)
    elif User.objects.filter(username = email).exists():
        user = User.objects.get(username = email)
    else:
        return JsonResponse(error_data,status=404)
    if user.forgot.forgot_password == password:
        
        return JsonResponse({'message':True})
    else:
        print(user.forgot.forgot_password,password)
        return JsonResponse(error_data,status=402)


def sendMail(request):
    
    error_data = {
        'error': 'Bad Request',
        'message': 'Wrong username or email'
    }
    
    data = json.loads(request.body)
    
    email = ''
    print(data)
    if validateEmail(data.get('email')):
        print('emaildir')
        email = data.get('email')
        if User.objects.filter(email=data.get('email')).exists():
            user = User.objects.get(email = data.get('email'))
            print('user var')
        else:
            print('email user yoxdur')
            return JsonResponse(status=403)
    else:
        print('usernamdir')
        if User.objects.filter(username = data.get('email')).exists():
            print('user var')
            user = User.objects.get(username = data.get('email'))
            email = user.email
        else:
            print('username user yoxdur')
            response = JsonResponse(error_data)
            response.status_code = 403
            return response
    if ForgottenPassword.objects.filter(user=user).exists():
        password = ForgottenPassword.objects.get(user=user)
        password.forgot_password = code_slug_generator()
        password.last_forgot = datetime.now()
        password.save()
    else:
        password = ForgottenPassword(user=user,forgot_password=code_slug_generator(),last_forgot=datetime.now())
        password.save() 
    content = password.forgot_password

    send_mail(
            "Zehmet olmasa sifreni daxil edin. Istifade mudddeti 5 deqiqedir",
            content,
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False, 
            html_message=content
    )
    
    return JsonResponse({'message':True})


def about(request):
    allheader = AllHeader.objects.all()
    if allheader.exists():
        allheader = allheader.first()
    if About.objects.all().exists():
        about = About.objects.first()
    else:
        about = {}


    context = {
        
        'about':about,
        'allheader':allheader
    }
    if Head.objects.all().exists():
        head = Head.objects.first()
        context['head'] = head

    return render(request,'about.html',context)

from django.core.paginator import Paginator
def embed(url):
    try:
        b = url.find('src="')
        if b != -1:
            e = url.find('"', b + 5)  
            if e != -1:
                src = url[b + 5:e]
        return src
    except:
        return ''
    
def meet(request):
    allheader = AllHeader.objects.all()
    if allheader.exists():
        allheader = allheader.first()
    videos = Meeting.objects.all()
    cat = request.GET.get('movzu')
    if cat:
        videos = Meeting.objects.filter(category=cat)
    # movies = Movie.objects.all()
    paginator = Paginator(videos,12)
    page = request.GET.get("page", 1)
    video_list = paginator.get_page(page)


    fcount = Meeting.objects.all().count()
    page_count = paginator.num_pages
    count = [count for count in range(page_count)]

  
    context = {
        'video_list':video_list,
        'fcount':fcount,
        'allheader':allheader,
        'count':count
    }
    if Head.objects.all().exists():
        head = Head.objects.first()
        context['head'] = head
    return render(request,'meet.html',context)
   
def spiker(request):
    allheader = AllHeader.objects.all()
    if allheader.exists():
        allheader = allheader.first()
    videos = Sportmen.objects.all()
    cat = request.GET.get('movzu')
    if cat:
        videos = Sportmen.objects.filter(category=cat)
    # movies = Movie.objects.all()
    paginator = Paginator(videos,12)
    page = request.GET.get("page", 1)
    video_list = paginator.get_page(page)


    fcount = Sportmen.objects.all().count()
    page_count = paginator.num_pages
    count = [count for count in range(page_count)]

  
    context = {
        'video_list':video_list,
        'fcount':fcount,
        'allheader':allheader,
        'count':count
    }
    if Head.objects.all().exists():
        head = Head.objects.first()
        context['head'] = head
    return render(request,'spiker.html',context)

def blog(request):
    
    blogs = Blog.objects.all().order_by('ordering')
    if request.GET.get('blog'):
        name = request.GET.get('blog')
        blogs = blogs.filter(Q(name__icontains=name) | Q(content__icontains=name))
    tag_name = request.GET.get('tag','')
    if tag_name:
        blogs = blogs.filter(tag__name = tag_name)
        
    paginator = Paginator(blogs, 4)
    page = request.GET.get("page", 1)

    start = int(page)-3
    end = int(page)+3
    if start<1:
        start = 1
        end = end+3
   

    blog_list = paginator.get_page(page)
    if end > blog_list.number:
        end = blog_list.number

    
    most_blogs = Blog.objects.all().order_by('views')[0:3]
    tags = Tag.objects.annotate(blog_count = Count('blog'))
    if len(most_blogs)>4:
        most_blogs=most_blogs[0:4]
    allheader = AllHeader.objects.all()
    if allheader.exists():
        allheader = allheader.first()
    context = {
        'blog_list':blog_list,
        'tags':tags,
        'most_blogs':most_blogs,
        'start':start,
        'end':end,
        'iterator':range(start,end+1),
        'allheader':allheader
    }
    if Head.objects.all().exists():
        head = Head.objects.first()
        context['head'] = head
        
    context['current_tag']=tag_name

    if 1 in [x for x in range(start,end+1)]:
        context['pagcheck']='1'
    return render(request,'blog.html',context)


def blogsingle(request,slug=None):

    blog = get_object_or_404(Blog,slug=slug)
    next_post = Blog.objects.filter(date__gt=blog.date).order_by('date').first()
    pre_post = Blog.objects.filter(date__lt=blog.date).order_by('-date').first()
    if not next_post:
        next_post = Blog.objects.filter(date__lt=blog.date).order_by('-date').first()
    if not pre_post:
        pre_post = Blog.objects.filter(date__gt=blog.date).order_by('date').first()
    
    tags = blog.tag.all()
    related_blogs = Blog.objects.filter(tag__in=tags).exclude(slug=slug).distinct()[:3]  # Adjust the number of related blogs as needed
    if len(related_blogs)<2:
        related_blogs = (related_blogs | Blog.objects.all()).distinct()[:3]
    most_blogs = Blog.objects.all().order_by('views')[0:3]
    allheader = AllHeader.objects.all()
    if allheader.exists():
        allheader = allheader.first()
    context = {
        'blog':blog,
        'tags':tags,
        'alltags':Tag.objects.all(),
        'next':next_post,
        'pre':pre_post,
        'related_blogs':related_blogs,
        'most_blogs':most_blogs,
        'allheader':allheader
        
    }
    if Head.objects.all().exists():
        head = Head.objects.first()
        context['head'] = head
    return render(request,'blog-details.html',context)

def contact(request):
    allheader = AllHeader.objects.all()
    if allheader.exists():
        allheader = allheader.first()
    context = {
        'allheader':allheader
    }
    if Head.objects.all().exists():
        head = Head.objects.first()
        context['head'] = head
    return render(request,'contact.html',context)


def speakersingle(request,slug=None):

    user = get_object_or_404(Sportmen,slug=slug)
    iframes = SportVideo.objects.filter(sportmen=user)
    allheader = AllHeader.objects.all()
    if allheader.exists():
        allheader = allheader.first()
    context = {
        'blog':blog,
        'allheader':allheader,
        'user':user,
        'iframes':iframes
        
    }
    if Head.objects.all().exists():
        head = Head.objects.first()
        context['head'] = head
    return render(request,'sportmenpage.html',context)
