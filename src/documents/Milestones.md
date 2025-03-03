# FRONTEND:
	PROBLEMS/THINGS TO FIX:
		- ensure all functions of lists and tasks work:
			|-> basic CRUD
				|-> Create = Lists and within them, Tasks
					- button and action to create task => form similar to the one when editing
				|-> Update = function/button to start modification process
					Defining every optional part of a task or task-list / button to edit whatever part of task/tasklist
		- ensure task-status works + it can be set after creation as part of
			- html drop-down for choosing(?)
	SOLVED(?):
		- Models are good(for now?)
		- Binding(taskList_Id) between tasklist and task is good
			- ensure the task model's taskList_Id is properly bound to tasklist model(tasklist deletion MUST delete all tasks as well)
		- CRUD for tasklists+tasks are good
		- Task status toggle is logically sound
		|-> basic CRUD:
			- Read = We got 'em all
			- Delete = done, cascades when tasklist is deleted

	Things to IMPLEMENT:
		IMPORTANT:
			- Ensure userdata is saved, encrypt password
			- Hungarian language support
			- {ADMIN_LOGIN}: Setting up admin login => process to create admins(decide)
				-> admin login procedure :
					|->continue with admin login component
					|->casual login, recognition of admin upon login
			- Admin side :
				|-> Read/Update/Delete of: users
				|-> Create of : daily motivationals / notices(eg.:server maintenance)
			
		LESS IMPORTANT:
			- Email notification upon registration
				|-> Notification for password changes(?)
			- Choosing Priority
			- Setting Due Date
			- Ordering based on importance of list and list-item
		OPTIONAL:
			- Dark-Mode(?) -> make site already be dark??
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

	Things to solve within code:
		- put a minlength at username at registrationForm, write code for html part too
	
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