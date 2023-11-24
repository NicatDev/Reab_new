from django.urls import path,include
from .views import *

urlpatterns = [
    path('',home,name='home'),
    path('contact',contact,name='contact'),
    path('speaker',speaker,name='speaker'),
    path('message',message,name='message'),
    path('login_register',login_register,name='login_register'),
    path('survey',survey,name='survey'),
    path('login/',login,name='login'),
    path('wishlist',wishlist,name='wishlist'),
    path('forgot',forgot,name='forgot'),
    path('meetjoin/<meet>',meetjoin,name='meetjoin'),
    path('logout/',logout_view, name='logout'),
    path('send_mail/',sendMail, name='send_mail'),
    path('check_password/',check_password, name='check_password'),
    path('change_password/',change_password, name='change_password'),
    
]
