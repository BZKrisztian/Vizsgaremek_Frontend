# FRONTEND:

INTEGRATION:
	- Refactor codes on frontend to ensure it only contains code related to frontend responsibilities
		- ensure no business logic remains on frontend
	- Refactor method names for clarity
	- Concise comments for each method and key properties (e.g., BehaviorSubjects, dialog toggles)
	- ensure backend security ( same as for tasklists, failsafe to make sure others can try to modify if the id doesnt match )
	- Keep sql dump file up to date

PRIMARY:
	- Full responsivity! (its gonna be me i think...)
	- Mobile app/port?? (may the divines above have mercy on me...)
	- Switch from http to https? (I dont even know how...)

	- Registration:
		- how to ensure the received email does not land within spam folder?
			- how to configure and ensure that the receiver sees a set name from the sender?
	- Button to turn users to admin(done) => basic js confirmation
	- unsubscribe everywhere to not cause bloating for devices/pc's?

	- 2D array to view user's tasklists on overseer table??( 3D to view tasks?? )
		- IF implemented: how to ensure it does not bloat the page in case we have too many users

SECONDARY:
	- configure the datepicker's overlay to not be behind the modal dialog component when it pops up
	- if a logged in, regular user tries to go to overseer through url, redirect to homepage instead of entry
	- user may delete their own account
	- upon successful registration, aside from message the user should be taken to entry page
	- create some css to blend in the custom colors of tasklists and tasks with the background a bit more
	- button to hide all tasklists(so that they may gaze upon the background?)
	- ability to choose wallpaper (homepage/overseer only, set only to local session for now, dont save setting to backend)
	- better error handling -> comprehensive messages for both devs and user
	- Hungarian language support ( finish making the files / rework json file structure / implement when all features are set )



COMPLEX / Future implementations:
	- {ADMIN RELATED} : {{ STILL SCRAPPED }}
		- Admin side :
			- Message system (admin CRUD + homepage display)
				- Only one message may be active at a time
				- Dismissible until next login
				- ability for user to X out the motivational/notice so they do not see it( resets on logout, upon login it shows again )
	- save chosen language to backend
	- make user inactive
	- Timer(Pomodoro) -> locally
	- Make site sticky on browser(can it even be done?)
	- License free:
		- Music ( Lo-Fi )
		- Ambiance/White-Noise ( Rain )
	- Recurring tasks
	- Diary(expand idea if it can happen) -> Methods/buttons to:
		|-> Create => List name and content
		|-> Read => get it, lol
		|-> Update => button to modify existing diary entry
		|-> Delete => delete, lol
	- Shared tasklists/tasks

SOLVED:
	- ensure selected username does not already exist
	- configure email upon registration ==> instead of simple notification, ensure it's also a verification step by clicking something
	- have a superadmin?(done, technically)
	- Search bar?
		- For Userlist to find user (username OR email)
			- ensure the table does not load in a way that it takes up the whole screen => implement scrolling
	- notification
		- notification to email upon registering
			- check if email is valid
				- CHECKS:
					- does it exist as an email (unverified)
						- IF YES = CHECK if it exists already within database
							- IF YES = deny registration and inform user that the email is already in use and to try a different one
						- IF NO = deny registration? // OR dont bother, since there's no need for confirmation of registration
					- is it already used within our database?
						- IF YES = deny registration and inform user that the email is already in use and to try a different one
					- send registration confirmation to email (done)
			- (Not yet implemented): email verification step via click link
	- user account update:
		- update username / email / password
	- Merge styling dev's css changes
	- replace current date picker with a more convenient one
	- ensure the main header to behave as a navbar
	- hold relevant buttons( language switch buttons / logout button IF logged in / gotoadminpage IF admin )
	- Admin Login:
		- Setup/process == create admins manually on backend?(where else to define, sql dump, environment on backend?)
		|-> Read of: users
			- differentiation of user and adminUser
		- Login procedure == recognition of admin upon login ( check email AND password from backend )
	- task completion:
		- does not change color
			- ( how to overwrite written/saved(to database) color property )
		- task completion(task_Status) is not saved to backend
		- ensure it can be toggled back into active='not finished' state
	- sorting list priority
	- admin setting (on database, manually?)
	- when registering as a different user, and then logging in, other user's list are still shown!
	- adminUser was dropped('isAdmin' boolean for users) => make sure there's no trace of adminUser
	- switch warning message method for deleting tasklist( check if confirmdeldialog works properly )
	- Ordering based on importance of list and list-item ( done with pipe, when backend finally works check if it works )
	- GUARDS: ensure AuthGuard and AdminGuard work together( no infinite loops, call-in order(first auth, then admin) etc. )
	- Omit dark mode codes
	- set up registration&login => ensure data related to user(tasklists+tasks) bind properly
	- {Task-List+Task-Item adding/editing} Wrap the forms
		=> Appearance = when adding/editing is pressed, a pop-up should appear for the form // OR make the Css really good/'transparent'
		- Wrap the Task-item adding form and bind it to appear at the click of a button
	- Logout button + process
	- ensure only admins can go to the Overseer(admin)page
		- upon an admin's login, automatically go to Overseer page
		- Should admins be able to go to regular user page(Homepage)? = yes and done ( CHECK if admins can create lists/tasks and the data is bound&saved to them on backend )
	- ensure completed task is different somehow(event for CSS change?)
	- Ensure userdata is saved, encrypt password
	- put a confirmation message for list deletion as a safety measure
	- Models are good(for now?)
	- Binding(taskList_Id) between tasklist and task is good
		- ensure the task model's taskList_Id is properly bound to tasklist model(tasklist deletion MUST delete all tasks as well)
	- Task status toggle is logically sound
	- CRUD for tasklists+tasks are good
		|-> basic CRUD:
			- Read = We got 'em all
			- Delete = done, cascades when tasklist is deleted
			- Create = Lists and within them, Tasks
				- button and action to create task => form similar to the one when editing
			- Update = function/button to start modification process
				Defining every optional part of a task or task-list / button to edit whatever part of task/tasklist
	- ensure task-status works and that it can be set/toggled after its initial creation
	- Choosing Priority
	- put a minlength at username at registrationForm, write code for html part too
	- Coloring of -> task-lists and tasks ( save to backend(?) + update datamodel to store color(?) )
	- Due date detection + alerts (today + expired) + auto-refresh when tasks change
	- Completed tasks move to bottom (via pipe)
	- Task border color set based on priority
	- Better registration requirement of password ( minlength, unique characters )
	- Better pop-up messages for errors during registration and login (pop-up does not show on registration error?)
	- put every necessary button to main header ( at app.component.html )
		- logout button (if logged in)
		- language switch
		- if admin: switch to homepage/overseer button
	- replace current date picker with a more convenient one
	- For Tasklist to find tasks (supports partial match)

# STYLING:
PROBLEMS/THINGS TO FIX:
	- 
IMPORTANT:
- CONST:
	- buttons
	- header ( include lang-switch buttons )
		- logout button
		- IF admin == switch to admin page button
			- button to switch to homepage
	- 'card' registration/login
	- background + opacity check
		- opacity issue => readability
- Pages:
	|-> Entry
		- Text
		- Card for buttons
	|-> Homepage
		- notification
	|-> Overseer(OPTIONAL!)
- Main components:
	|-> Task-List
	|-> Task-Item
	- Dialog-Comps:
		- TaskListDialog
		- TaskDialog
		- ConfirmdelDialog
LESS IMPORTANT:

# TESTING:
PROBLEMS/THINGS TO FIX/REPORT(?):
	- 

# DOCUMENTS:
Official documentation ( contains everything / finalised ):
	- 1. Introduction ( What the app is and why we chose it )
	- 2. User documentation ( How to use it, in layman's terms )
	- 3. Dev documentation ( Explanation of everything )
		- Used technologies ( Angular/Typescript, C#, SQL )
		- Used IDE's ( VsCode, Visual Studio, XAMPP )
		- Thorough description of all parts of the project ( mainly, the methods )
			- Frontend = Components(+Pages/Dialogs), Services, Guards
			- Backend = Endpoints, Models
				- Database = Structure, Table names/stored data
	- 4. Tests ( Insomnia, Postman )
		- Awaited response of functions
	- 5. Summary
		- Possibilities for future development

# BACKEND:
PROBLEMS/THINGS TO FIX/FORWARD:
	- Registration:
		- received from Frontend, correctly formated/hashed, sent to database
	- Login:
		- request received from Frontend, check if credentials are correct AND if a user is admin,
		then generates a token, sends it to Frontend
	- Cascading deletion for tasklist
		- checks if there are tasks:
			- IF YES = deletes every task and then itself
			- IF NO = simply deletes itself
	- Set up SQL database
	- SQL dump file
		- to help set it up wherever we want
