# The Goal of the App
To offer help in organising people's lives, especially to those who suffer from some mental illness such as ADD/ADHD.

# The features of the App
## MAIN:
    - On the 'Entry' page, one may choose to register, or if that already occured, then they may login.
    - Upon logging in, the user will be redirected to the 'Homepage', where the user can start creating lists, and within these individual lists, tasks.
        - Furthermore, these tasks can be given a priority, and they will be ordered accordingly. Users will also be able to 'complete' tasks, which will result in the task moving to the bottom and being greyed out. Should the user feel the task was completed prematurely(e.g.:accidental clicking), the task can be toggled back to being active.
    - For the admins, they will be recognised upon logging in. Once that is done, they will be redirected to the admin page, where they may gaze upon the list of registered users and send out motivational messages, and, separately, notices to the users.
## SPECIFICS:
    - Registration :
        - The user inputs their data => username(seen at homepage when they login("Welcome, {userName}")), email and password(hashed at backend before sent to database)
        - The user must adhere to some restrictions, such as:
            - The user may not use username and email that has been chosen by someone else.
            - There is a minimum requirement for character length on username and password
    - Login :
        - upon logging in, certain things will be checked:
            - IF the user is an ADMIN (the email and password will be checked) => redirection to admin page('overseer')
            - IF the user is not an admin => redirection to hub('homepage')
            - IF NEITHER => stay at first page('entry'), reset login form
    - 