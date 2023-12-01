from django.contrib import admin
from meetingapp.models import Meeting,Eager,Sportmen,Partners,About,Header,Message,Survey,Blog,Tag,Category,Head,AllHeader,Achi,SportVideo
from django.contrib.auth import get_user_model
from ckeditor.widgets import CKEditorWidget
User = get_user_model()

from django.db import models
class MyModelAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': CKEditorWidget(config_name='default')},
    }
    # exclude = ('content_without_ck','content','name','bottomcontent','sidename','sidecontent','bottomname')
# admin.site.register(HomeHeader)
admin.site.register(Message)
admin.site.register(Meeting)

admin.site.register(Partners)
admin.site.register(Eager)
admin.site.register(About)
admin.site.register(Header)
admin.site.register(Survey)
admin.site.register(Blog,MyModelAdmin)
admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(Head)
admin.site.register(AllHeader)
class AchiInline(admin.TabularInline):  
    model = Achi
    extra = 0

class SportVideoInline(admin.TabularInline):  
    model = SportVideo
    extra = 0

class SportmenAdmin(admin.ModelAdmin):
    inlines = [AchiInline,SportVideoInline]
    list_display = ('user', 'field', 'phone_number', 'is_active', 'image')  

admin.site.register(Sportmen, SportmenAdmin)

