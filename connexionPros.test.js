const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./app');
const UserPro = require('./models/userPro')

const newUser = {
username: "test",
lastName: "testlastname",
firstName: "testfirstname",
password: "123",
confirmPassword:"123"
}

const connexionUser = {
username: newUser.username,
password: newUser.password,

}


beforeEach(async () => {
   
    await UserPro.deleteOne({ username: newUser.username });
});


it('POST/userpros créer compte professionnel', async()=>{
const res = await request(app).post('/pros/signup').send(newUser)
expect(res.statusCode).toBe(200);
expect(res.body.result).toBe(true);
expect(res.body).toHaveProperty("token",expect.any(String))
})

it('POST/userpros connexion pro ', async()=> {
    await request(app).post('/pros/signup').send(newUser);
const res2 = await request(app).post('/pros/signin').send(connexionUser
);
expect(res2.statusCode).toBe(200);
expect(res2.body.result).toBe(true);


})

