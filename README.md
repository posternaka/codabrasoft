# User registration form

`Input data:`
1) "Name". Options:
- minimum number of characters 2;
- maximum number of characters 25;
- required field.
2) "Surname". Options:
- minimum number of characters 2;
- maximum number of characters 25;
- required field.
3) "Date of birth". Options:
- maximum date - today;
- required field.
4) "E-mail address". Options:
- validation;
- required field.
5) "Password". Options:
- minimum number of characters 8;
- at least 1 character in upper case;
- at least 1 digit;
- at least 1 special character from the string !@#$%;
- required field.
6) "Password Confirmation". Options:
- match with the "Password" field;
- required field.

Show message(s) with validation errors.
Make a request (submit) with valid form data on POST
https://jsonplaceholder.typicode.com/posts and print the body of the request to the console.
