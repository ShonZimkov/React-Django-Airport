Shon's Port is a application for airports

Description:
My application can manage data for searching flights , booking them and paying
more over there are few facades for anonymus, customer, airline and admin
each one allows you to use function related to your permission for example:
only an airline can add flights because only they know when and where they are flying to
a customer can look for flights based on destinations and dates , purchase and book flights
the admin can give permission for an account and make it a customer/airline/admin , delete and update relevent data

I used django and react for this project to practice what i learned
i found both of them very usful and learned how to use them properly fix problems and using them for doing what i needed and wanted

the more challenging part of the project was styling the components in react

Install and run from git:
download backend packages - cd BACK , pip install -r requirements.txt                            
donwnload frontend packages - cd FRONT , cd my-app ,npm i

run back - cd BACK , py manage.py runserver
run front - cd FRONT , cd my-app ,npm start

Recommended
INSTALL from docker hub:
front image - docker pull shonzimkov/airproject_frontend
back image - docker pull shonzimkov/airproject_backend

![search](https://user-images.githubusercontent.com/100130589/186420512-24bea469-33a4-436a-b173-fb77c8462d57.png)
![sign](https://user-images.githubusercontent.com/100130589/186421864-e188cc8d-44c0-4380-ad33-0c7428f94e52.png)
![popular](https://user-images.githubusercontent.com/100130589/186420641-aa812d61-febc-439a-8954-7f13dc5eb4b0.png)
