from django.db import models
from django.contrib.auth import get_user, get_user_model
from meetingapp.utils import *
from datetime import datetime
from django.contrib.auth import get_user_model
from django.utils.text import slugify

class BaseMixin(models.Model):
    slug = models.SlugField(unique=True,editable=False,blank=True,null=True)
    created_at = models.DateField(auto_now_add=True,blank=True,null=True,)
    title = models.CharField(max_length=1200,null=True,blank=True,verbose_name='title for seo')
    keyword = models.CharField(max_length=1200,null=True,blank=True,verbose_name='keyword for seo')
    alt = models.CharField(max_length=1200,null=True,blank=True)
    description = models.CharField(max_length=1200,null=True,blank=True,verbose_name='description for seo')
    
    class Meta:
        abstract = True

User = get_user_model()

class Partners(models.Model):
    image = models.ImageField()
    title = models.CharField(max_length=120)
    def __str__(self):
        return self.title
    
class About(models.Model):
    bigimage = models.ImageField(verbose_name='630-522')
    smallimage = models.ImageField(verbose_name='344-285')
    title = models.CharField(max_length=50)
    content = models.CharField(max_length=190,verbose_name='180-190 herf max content')
    content2 = models.CharField(max_length=120,verbose_name='110-120 herf max content')
    
    def __str__(self):
        return "Haqqinda bolmesi"
    
    def save(self, *args, **kwargs):
        self.pk = 1  
        super(About, self).save(*args, **kwargs)
    
class Sportmen(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='owner')
    field = models.CharField(max_length=120,null=True,blank=True)
    phone_number = models.CharField(max_length=120,null=True,blank=True)
    titul = models.CharField(max_length=1200,null=True,blank=True)
    is_active = models.BooleanField(default=False)
    image = models.ImageField(null=True,blank=True)
    personal_information = models.TextField(null=True,blank=True)
    achievements = models.TextField(null=True,blank=True)

    def __str__(self):
        return self.user.first_name + self.user.last_name + self.field
    
class Message(models.Model):
    name = models.CharField(max_length=120)
    email = models.CharField(max_length=120)
    subject = models.CharField(max_length=120)
    phone = models.CharField(max_length=120)
    message = models.CharField(max_length=120)
    
    def __str__(self):
        return self.name

class Header(models.Model):
    minititle1 = models.CharField(max_length=120)
    title1 = models.CharField(max_length=200)
    minititle2 = models.CharField(max_length=120)
    title2 = models.CharField(max_length=200)
    minititle3 = models.CharField(max_length=120)
    title3 = models.CharField(max_length=200)
    image1 = models.ImageField()
    image2 = models.ImageField()
    image3 = models.ImageField()
    
    def save(self, *args, **kwargs):
        self.pk = 1  
        super(Header, self).save(*args, **kwargs)
    
    def __str__(self):
        return 'Header 3 slide'
    
    
class Eager(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='eager')
    field = models.CharField(max_length=120,null=True,blank=True)
    phone_number = models.CharField(max_length=120,null=True,blank=True)
    is_blocked = models.BooleanField(default=False)
    is_moderator = models.BooleanField(default=False)
    
    def __str__(self):
        return self.user.first_name + ' - ' + self.user.last_name
    
class ForgottenPassword(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='forgot')
    forgot_password = models.CharField(max_length=120,null=True,blank=True)
    last_forgot = models.DateTimeField(null=True,blank=True)


class Meeting(models.Model):
    title = models.CharField(max_length=120,null=True,blank=True)
    content = models.TextField(null=True,blank=True)
    content2 = models.TextField(null=True,blank=True)
    meeter = models.ManyToManyField(User,related_name='meetings')
    meetingowner = models.ForeignKey(User,on_delete=models.CASCADE,related_name='adventures')
    date = models.DateTimeField()
    time = models.CharField(max_length=1200,verbose_name='saat like 10:00 or 10:00-11:00')
    location = models.CharField(max_length=1200,null=True,blank=True)
    meeting_id = models.TextField(null=True,blank=True)
    finished = models.BooleanField(default=False)
    meeting_duration = models.CharField(max_length=120,verbose_name='gorus vaxti')
    
    def __str__(self):
        return self.meetingowner.username
    

class Survey(models.Model):
    name = models.CharField(max_length=1200)
    
    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=800)
    
    def __str__(self):
        return self.name + '--category'

class Tag(models.Model):
    name = models.CharField(max_length=800)
    
    def __str__(self):
        return self.name
    

   
class Blog(BaseMixin):
    tag = models.ManyToManyField(Tag,null=True,blank=True)
    name = models.CharField(max_length=1200,unique=True)
    content_without_ck = models.CharField(max_length=1200,null=True,blank=True)
    content = models.TextField()
    image = models.ImageField()
    date = models.DateField(null=True,blank=True)
    ordering = models.SmallIntegerField(null=True,blank=True)
    sidename = models.CharField(max_length=230,null=True,blank=True)
    sidecontent = models.TextField(null=True,blank=True)
    sideimage1 = models.ImageField(null=True,blank=True)
    sideimage2 = models.ImageField(null=True,blank=True)
    bottomname = models.CharField(max_length=1200,null=True,blank=True)
    bottomcontent = models.CharField(max_length=12000,null=True,blank=True)
    bottomimage = models.ImageField(null=True,blank=True)
    views = models.CharField(max_length=1000,null=True,blank=True,default=0)

    def __str__(self):
        return self.name +  '-------- Bloq'
    
    def save(self, *args, **kwargs):
        new_slug = slugify(self.name)
        self.slug = new_slug
        if Blog.objects.filter(slug=new_slug).exists():
            count = 0
            while Blog.objects.filter(slug=new_slug).exists():
                new_slug = f"{slugify(self.name)}-{count}"
                count += 1
        super(Blog, self).save(*args, **kwargs)