#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics import pairwise_distances
import win32api


# In[ ]:


import json
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from flask import jsonify
from sqlalchemy import create_engine
from flaskext.mysql import MySQL
from json import dumps
import mysql.connector
from mysql.connector import Error
import pandas
import pymysql
from sklearn.metrics.pairwise import cosine_similarity
import operator


# In[ ]:


app = Flask(__name__)
CORS(app)
api = Api(app)


# In[ ]:


def recommend_courses(student_id, similar_student_ids, rating_matrix, no_of_courses=5):
    
    #get all ratings data of similar students
    similar_students = rating_matrix[rating_matrix.index.isin(similar_student_ids)]
    # each students ratings scale is different, so find an average to measure them all on same scale
    similar_students = similar_students.mean(axis=0)
    similar_students_data = pd.DataFrame(similar_students, columns=['mean'])
    
    
    # get data for current student
    student_data = rating_matrix[rating_matrix.index == student_id]
    student_data_transposed = student_data.transpose()
    # rename the column as 'rating'
    student_data_transposed.columns = ['rating']
    # remove rows that has value other than 0. course not taken yet(not rated)
    student_data_transposed = student_data_transposed[student_data_transposed['rating']==0]
    # gives a list of courses the student has not yet taken
    courses_not_taken = student_data_transposed.index.tolist()
    
    # get avg ratings for courses from similar students (only courses which current student has not taken)
    similar_students_data_filtered = similar_students_data[similar_students_data.index.isin(courses_not_taken)]
    similar_students_data_ordered = similar_students_data_filtered.sort_values(by=['mean'], ascending=False)
    
    # get the top 10 courses to recommend   
    top_n_courses = similar_students_data_ordered.head(no_of_courses)
    top_n_course_ids = top_n_courses.index.tolist()
    # we have the ids, using the ids get the course names
    #recommended_courses = courses[courses['course_id'].isin(top_n_course_ids)]
    
    #return recommended_courses #no_of_courses
    return top_n_course_ids


# In[ ]:


#find 10 most similar students to the current student by using cosine similarity
def get_similar_students(student_id, matrix, n=3):
    # data of current student
    current_student = matrix[matrix.index == student_id]
    
    # data of all other students
    other_students = matrix[matrix.index != student_id]
    
    # find cosine similarity between current student and every other student
    similarities = cosine_similarity(current_student,other_students)[0].tolist()
    
    # get the ids of all other students in a list
    indices = other_students.index.tolist()
    
    # generate key val pairs of (other_studentid : similarity_with_current_stud) eg: (100416 : -0.16903085094570325)
    index_similarity = dict(zip(indices, similarities))
    
    # sort the similarity vals => negative to 0 to positive
    sorted_index_similarity = sorted(index_similarity.items(), key=operator.itemgetter(1))
    #  we need highest similarity so now sort above data in reverse order
    sorted_index_similarity.reverse()
    
    # now pick out the top 3 students from above data - these are the most similar out of all
    top_similarities = sorted_index_similarity[:n]
    students = [s[0] for s in top_similarities]
    
    return students


# In[ ]:





# In[ ]:


def getRecommendation_ids(input_student_id):
    connection = mysql.connector.connect(host='localhost',
                                         database='proj_schema',
                                         user='root',
                                         password='root')
    conn = pymysql.connect(host='localhost', user='root', password='root', database='proj_schema')
    course_query = "select course_id, course_name from courses_all"
    results = pandas.read_sql_query(course_query, conn)      
    results.to_csv("C:\CIS_Masters\Final_Masters_Project\My Code\Recommendation\My Code\Read Data from table\courseDetails.csv", index=False)

    ratings_query = "select student_id, course_id, rating from course_feedback"
    results1 = pandas.read_sql_query(ratings_query, conn)       
    results1.to_csv("C:\CIS_Masters\Final_Masters_Project\My Code\Recommendation\My Code\Read Data from table\studentRatings.csv", index=False)

    courses = pd.read_csv("C:\CIS_Masters\Final_Masters_Project\My Code\Recommendation\My Code\Read Data from table\courseDetails.csv",encoding="Latin1")
    Ratings = pd.read_csv("C:\CIS_Masters\Final_Masters_Project\My Code\Recommendation\My Code\Read Data from table\\studentRatings.csv")  

    #find average rating of each student based on all his ratings = mean
    #rating_x = student rating for each course, rating_y = student's mean rating(avergae of all his ratings)
    #find the deviation rating from his mean rating for each course = deviation_rating

    Mean_Rating = Ratings.groupby(by="student_id",as_index=False)['rating'].mean()
    Average_Rating = pd.merge(Ratings,Mean_Rating,on='student_id')
    Average_Rating['deviation_rating']=Average_Rating['rating_x']-Average_Rating['rating_y']
    Average_Rating.head()

    ratings_matrix=pd.pivot_table(Average_Rating,values='deviation_rating',index='student_id',columns='course_id')
    ratings_matrix.head()

    # replace NaN values with 0
    ratings_matrix = ratings_matrix.fillna(0)
    ratings_matrix.head()

    current_student = input_student_id
    similar_student_ids = get_similar_students(current_student, ratings_matrix)
    print(similar_student_ids)

    courses_recommended_to_currentStudent = recommend_courses(current_student, similar_student_ids, ratings_matrix)
    print(courses_recommended_to_currentStudent)

    return courses_recommended_to_currentStudent   


# In[ ]:


class Recommendations(Resource):
    @cross_origin(origin='*')
    def get(self, input_student_id):
        recommendation_ids = getRecommendation_ids(int(input_student_id))       
                
        return recommendation_ids       
        
        


# In[ ]:





# In[ ]:





# In[ ]:


api.add_resource(Recommendations, '/recommendationsIds/<input_student_id>') # Route_1


# In[ ]:


if __name__ == '__main__':
     app.run(host="0.0.0.0", port=8094, threaded=True)


# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:







# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:




