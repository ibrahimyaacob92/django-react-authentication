from django.shortcuts import render
from .models import Student, Teacher
from django.db import connection  # give more info about the query
from django.db.models import Q
from pprint import pprint

# Create your views here.
def student_list(request):

    # select all the fields in the table Studentzs
    post = Student.objects.all()   

    # select with OR and with field and startwith -- simplify code with Q object
    post = Student.objects.filter(surname__startswith='Hashim') | Student.objects.filter(surname__startswith='Yaacob')
    post = Student.objects.filter(Q(surname__startswith='Reed')|Q(surname__startswith='Yaa'))
    
    # select with AND operator
    post = Student.objects.filter(classroom=3) & Student.objects.filter(firstname__startswith='bil')

    # Exclude query
    post = Student.objects.exclude(classroom=3)

    # complex query
    post = Student.objects.filter(Q(surname__startswith='Yaacob') & Q(firstname__startswith='Ibrahim'))
    
    # Get Values
    post = Student.objects.all().values()       # get everything.. in form of dictionary
    post = Student.objects.all().values_list()  # get in form of list

    # Join UNION two models
    studentQuery = Student.objects.all().values_list('firstname')   # get first name
    post = studentQuery.union(Teacher.objects.all().values_list('firstname'))

    # Get - return only one object instead of queryset
    post = Student.objects.filter(firstname='Ibrahim').get()  # get only returns one object
    post = Student.objects.get(firstname='Ibrahim') # also work
    
    # CREATE - blindly create without validating
    if (Teacher.objects.filter(firstname='John').exists()):
        print('already exist')
    else:
        post = Teacher.objects.create(firstname='John', surname='HandCock')
        post.save()

    # Updating Object
    teacher = Teacher.objects.get(id=5)
    teacher.firstname = 'Henry'
    teacher.save()


    # Deleting Object
    if (Teacher.objects.filter(id=6).exists()):
        toBeDelete = Teacher.objects.get(id=6)
        toBeDelete.delete()



    print(post, type(post))
    pprint(connection.queries) # return you the query information including the truntime

    return render(request, 'students/output.html', {'post':post})

