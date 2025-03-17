# FRONTEND:
	INTEGRATION:
		- Refactor codes on frontend to ensure it only contains code related to frontend responsibilities
		- ensure no business logic remains on frontend
	PROBLEMS/THINGS TO FIX:
		- Logout button + process
		- {ADMIN_LOGIN}: Setting up admin login => process to create admins(manually, on backend?)
			-> admin login procedure :
				|->casual login, recognition of admin upon login ( check email AND password(?) )
		- Admin side :
			|-> Read/(Update?)/Delete of: users
			|-> Create/Delete of : daily motivationals (+ notices later on(eg.:server maintenance))
		- GUARDS: ensure AuthGuard and AdminGuard work together( no infinite loops, call-in order(first auth, then admin) etc. )
		- set up registration&login => ensure data related to user(tasklists+tasks) bind properly
			- + ensure admins can create tasklists and tasks, backend binds their data to them(admin users) accordingly
		- {Task-List+Task-Item adding/editing} Wrap the forms
			=> Appearance = when adding/editing is pressed, a pop-up should appear for the form // OR make the Css really good/'transparent'
			- Wrap the Task-item adding form and bind it to appear at the click of a button
	
	SOLVED(?):
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
			- Hungarian language support
			
		LESS IMPORTANT:
			- ensure toggle completion can be clicked again, resetting the state of the task
			- Email notification upon registration
				|-> Notification for password changes(?)
			- Setting Due Date
			- Ordering based on importance of list and list-item
			- switch warning message method for deleting tasklist( current = javascript -> confirm() )
		OPTIONAL:
			- Dark-Mode(?) -> make site already be dark?? // Toggle button for body(CSS)
			- Coloring of -> task-lists and tasks ( save to backend(?) + update datamodel to store color(?) )
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
				|-> Update => button to modify existing diary entry's datamodel
				|-> Delete => delete, lol

	
# CSS/BOOTSTRAP:
	PROBLEMS/THINGS TO FIX:
	Things to IMPLEMENT:
		IMPORTANT:
		- Page design:
			|-> Entry
			|-> Homepage
			|-> Overseer(OPTIONAL!)
		- Main components:
			|-> Task-List
			|-> Task-Item
		
		LESS IMPORTANT:
		
# TESTING:
	PROBLEMS/THINGS TO FIX/REPORT(?):
		- Check if CRUD works properly for backend,
			|-> For now, test with json-server(expect Cors errors)

	DOCUMENTS:
	- MAIN:
		- Documentation on what the app does
		- Documentation on how the app works
	- OTHER(?):
		- Documentation on what the errors are
		- Documentation on how the errors were fixed


# BACKEND:
	PROBLEMS/THINGS TO FIX/FORWARD:
		- Modify datamodels
		- Set endpoints