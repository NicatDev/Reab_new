from django import forms
from .models import *
from django.contrib.auth.forms import UserCreationForm
class Messageform(forms.ModelForm):

    class Meta:
        model = Message
        fields = ['name','email','message','phone','subject']
    
        
    def __init__(self,*args,**kvargs):
        super(Messageform,self).__init__(*args,**kvargs)
        

class Surveyform(forms.ModelForm):

    class Meta:
        model = Survey
        fields = ['name']
    
    def __init__(self,*args,**kvargs):
        super(Surveyform,self).__init__(*args,**kvargs)
        
class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = get_user_model()  
        fields = ('username', 'email', 'password', 'first_name', 'last_name')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user