##### Issue:
* contact data is not showing in http://localhost:3000/test-database

##### Solution:
add async/await because mongoose.Schema.create is a promise.

