This is the backend implementation in NodeJS.

A REST Api server is created to server the app the required data for it to function.

#### Brief description of the app

There are various users which includes Teachers, Students and Parents/Guardian.

### HTTP methods and their functions

GET = Retrive all documents of (users, subjects, etc).
GET + doc_id = Retrieve a particular document by ID.
POST = Add a new document.
PUT + doc_id = Update an existing document.
DELETE + doc_id = Delete a document by id.

#### The subject routes

1. To add a subject
   localhost:3000/subject
   method : POST
   JSON request body example

   {
   "title": "Subject Carrier",
   "studentsOffering":
   [{
   "studentId":"This should be id",
   "score": 99
   }]
   }

2. To retrieve all subject
   localhost:3000/subject
   method : GET

3. To retrieve one subject by id
   localhost:3000/subject/:id //Replace :id by unique subject (document) id
   method : GET

4. To delete one subject by id
   localhost:3000/subject/:id //Replace :id by unique (document) subject id
   method : DELETE

#### The user routes for account sign up and sign in... This applies to all users (admin, student, tutor, guardian)

1. To signup a new user
   localhost:3000/admin/signup
   method : POST
   JSON request body example

   {
   "name":{"fname":"Another", "lname":"Someone"},
   "email":"testerSomeone@test.com",
   "password":"testPassword"
   }

2. To retrieve all user in a category (e.g all Admin) // Note: A category is contained within a collection in the Database.

localhost:3000/admin
method: GET

3. To retrieve a user profile by ID

localhost:3000/admin/:id
method: GET

4. To delete a user profile by ID

localhost:3000/admin/:id
method: DELETE

5. To login a user

localhost:3000/admin/login
method : POST
JSON request body example

{
"email":"testerSomeone@test.com",
"password":"testPassword"
}

#### Signup Guardian
 To signup a new Guardian
   localhost:3000/guardian/signup
   method : POST
   JSON request body example

   {
   "name":{"fname":"Another", "lname":"Someone"},
   "email":"testerSomeone@test.com",
   "password":"testPassword",
   "ward":[{}]
   }

#### Signup Student  
 To signup a new Student
   localhost:3000/student/signup
   method : POST
   JSON request body example

   {
   "name":{"fname":"Another", "lname":"Someone"},
   "email":"testerSomeone@test.com",
   "password":"testPassword"
   }

   I'll be adding PUT method to update student subjects.



#### Signup Tutor
 To signup a new Guardian
   localhost:3000/tutor/signup
   method : POST
   JSON request body example

   {
   "name":{"fname":"Another", "lname":"Someone"},
   "email":"testerSomeone@test.com",
   "password":"testPassword",
   "subject":"Subject title"
   }

I'll be adding PUT method to update student subjects.