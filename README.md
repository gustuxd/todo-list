# Todo List

This is a short project to have a glimpse at NestJS. I used an SQLite via [TypeORM](https://typeorm.io/#/), [NestJS](https://nestjs.com/) for the services and controllers and [React](https://reactjs.org/) + [Ant Design](https://ant.design/) for the frontend.

Maybe I'll implement more features later (I have some ideas noted on this project **Issues** tab).

Here is an image of the frontend page (there is only one frontend page):

![image](https://user-images.githubusercontent.com/18200593/139173555-6c2757ba-383d-4294-8a3a-186e2180c3e8.png)


## How to use it

Both back and frontend are on this project, but in different directories.

1. Clone the repository
2. Install NestJS globally ```npm i -g @nestjs/cli```
3. Install each project's dependencies with npm
```cd <PROJECT_ROOT>/backend && npm install```
and
```cd <PROJECT_ROOT>/frontend/react-todos && npm install```
4. Run both applications ```cd <PROJECT_ROOT>/backend && npm start```
and
```cd <PROJECT_ROOT>/frontend/react-todos && npm start```
5. Have fun with your to-do list!
