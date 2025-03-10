# Testing goals (when backend url's are fully set up) :
    - Check if the holy trinity ( in the name of the frontend, the backend and the holy database ) communicate properly
    - Registration procedure
        - data is saved to database
        - backend hashes password
    - Login Procedure ( frontend gets backend to check if data exists in database )
        - can log in
        - check if admin can log in and be recognised ( +automatic redirecting )
    User side :
        - CRUD of : Tasklists and Tasks
    Admin side :
        - CRUD of : Tasklists and Tasks
        - RD of : Users
        - CRUD of : Motivationals/Notices
    - Logout Procedure ( token deletions )