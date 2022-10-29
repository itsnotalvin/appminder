# Appminder

Appminder is a digital resource that helps you organise the details of your job applications throughout the recruitment process. You can sort your applications throughout the 4 stages of 'Drafting', 'Applied', 'Interviewing', 'Awaiting'.

You can use Appminder at `https://appminder.herokuapp.com/`


## Approach Taken
- We approached this application to provide a solution to everyone who is in the job application process. We understand the pain points of applying to multiple jobs and losing track of the numerous jobs you apply for. Thus we developed this project to help others track their applications throughout the job processes through an easy and intuitive 'drag and drop' function.

## Application Features
- Signup form uses a validation checking script, which ensures your passwor contains at least one Capital (A-Z), Lowercase(a-z), Number(0-9), Special character (!@#$%^&*). After you have registered, an email will be sent to your registered email address to confirm your registration.

- Add application modal built using react portals allows you to add a job application to Appminder.

- Main module to track your job applications uses react-dnd to allow for maneuvering of applications throughout the job process. Appminder module sorts your applications by 'key-date' to ensure that you can see which applications keydates are nearest. Furthermore, data is displayed using MUI Table styling so that data values are all aligned. An expansion indicator allows you to view the notes, so that you have a high level view of all your applications upon landing.

- Profile page shows your current applications throughout the Job Stages in a pie chart format, this was built using NIVO Pie.


## Digital Mockups
Prototype and wireframes created with Figma
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FVcMhiTtNsO2z23UMnuKzfJ%2FAppminder%3Fpage-id%3D5%253A720%26node-id%3D5%253A1104%26starting-point-node-id%3D5%253A1104" allowfullscreen></iframe>


## Database Flowchart 
<img src="https://embed.creately.com/QNy8mqhdIc1?token=DNhtjpWWyZ8QdbCG&type=svg">



## Technologies Used
- Node js (libraries)
- Bcrypt
- Express-session
- React
- HTML
- CSS
- Drag n Drop
- Postgres SQL


## Future Implementations
- Email notification to send reminders x amount of days to next application deadline
- Social Login
- Profile page and allowing users to change password either through security question or an email notification
- Ability to filter and sort your applications by company name, role, key dates, etc..


## Potential Improvements
- Mobile responsiveness
- Screen-reader functionality