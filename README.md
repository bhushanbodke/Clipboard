
# Clipboard
Clipboard is web application that is used to sync your files and messages
across all platform with working internet connection and browser

## Distinctiveness and Complexity
I made this app because i personally transfer files
very frequantly from my smartphone to my laptop and doing that wireless
is very convinent.\
this uses backend as Django Rest Framework
and Frontend of React 
for styles of Frontend uses material UI components and material UI Icons

## how to run project 
just clone the git repo.\
run the "requirements.bat" file ,
which will install all pip requirements and react requirements

### to launch django backend
run command "python manage.py runserver (YourIp):8000".\
where manage.py exists
### to launch react 
run "npm start".\
if you get react-scripts error
run "npm audit fix"

## Files

### django files 

#### models.py
App uses only three models.
1) User model 
2) Messages model
3) Files model

#### urls.py
Have urls for 
1) login 
2) add messages
3) add files 
4) get files
5) get messages
6) register users
7) delete messages
8) delete files

#### serialiers.py
Have serialiers to serialize data to send by DRF


### React files 
#### components
All react components are in src/components folder.\
all components have seprate css files
1) Board.js - main Clipboard for messages
2) Files.js - main Files for messages
3) FilesMap.js - Map Files recived from  DRF 
4) loading.js - loading screen 
5) login.js - Login user screen 
6) Register.js - register user screen 
7) Navigation.js - Bottom Navigation bar for App 
7) Filepreview.js - To Preview the image file  
8) GoBottom.js - Button to go to bottom of page or top of page 

10) Context.js - Context file to provide Context information to whole app contains login functions