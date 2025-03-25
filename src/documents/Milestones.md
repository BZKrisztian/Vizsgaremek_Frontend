# FRONTEND:
	INTEGRATION:
		- Refactor codes on frontend to ensure it only contains code related to frontend responsibilities
		- ensure no business logic remains on frontend
	PROBLEMS/THINGS TO FIX:
		- Omit dark mode codes
		- adminUser was dropped('isAdmin' boolean for users) => make sure there's no trace of adminUser
		- {ADMIN RELATED} :
			- Admin Login:
				- Setup/process == create admins manually on backend(?)
				- Login procedure == recognition of admin upon login ( check email AND password from backend )
			- Admin side :
				|-> Read/Delete of: users
					- EXCLUDE admin users so they cannot delete each other
				|-> CRUD of : daily motivationals to be posted for users at Homepage (+ notices later on(eg.:server maintenance))
					- Timers for automatic deletion(?)
		- GUARDS: ensure AuthGuard and AdminGuard work together( no infinite loops, call-in order(first auth, then admin) etc. )
		- Hungarian language support ( finish making the files )
		- Ordering based on importance of list and list-item ( done with pipe, when backend finally works check if it works )
		- ensure toggle completion can be clicked again, resetting the state of the task
		- switch warning message method for deleting tasklist( check if confirmdeldialog works properly )
	SOLVED:
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

	Things to IMPLEMENT:
		IMPORTANT:
			- Email notification upon registration
				|-> Notification for password changes(?)
		LESS IMPORTANT:
			- Coloring of -> task-lists and tasks ( save to backend(?) + update datamodel to store color(?) )
			- better error handling -> comprehensive messsages for both devs and user
		OPTIONAL:
			- Dark-Mode(?) -> make site already be dark?? // Toggle button for body(CSS)
			- Timer(Pomodoro) -> locally
			- Make site sticky on browser(can it even be done?)
		COMPLEX(only if done with everything else):
			- License free:
				- Music ( Lo-Fi )
				- Ambiance/White-Noise ( Rain )
			- Recurring tasks
			- Diary(expand idea if it can happen) -> Methods/buttons to:
				|-> Create => List name and content
				|-> Read => get it, lol
				|-> Update => button to modify existing diary entry
				|-> Delete => delete, lol

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
