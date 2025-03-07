const request = require("supertest");
const app = require("./app");
const User = require("./models/users");

const newUser = {
  username: "testUsername",
  lastname: "nomfamille",
  motherName: "test",
  room: 215,
};
const ConnectUser = {
  username: `${newUser.username}`,
  password: `${newUser.lastname}_${newUser.motherName}`,
};

beforeEach(async () => {
  await User.deleteMany({ username: newUser.username });
  await User.deleteMany({ room: newUser.room });
});

// est-ce que la route POST /signup existe ?
it("POST /signup - ajouter une patiente", async () => {
  const res = await request(app).post("/users/signup").send(newUser);

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("result", true);
  expect(res.body).toHaveProperty("data");
  expect(res.body.data).toHaveProperty("username", newUser.username);
  expect(res.body.data).toHaveProperty("motherName", newUser.motherName);
  expect(res.body.data).toHaveProperty("room", newUser.room);
});

// test route POST /signin pour la connexion d'une patiente
it("POST /signin - connexion patiente", async () => {
  await request(app).post("/users/signup").send(newUser);
  const res = await request(app).post("/users/signin").send(ConnectUser);

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("result", true);
  expect(res.body).toHaveProperty("data");
});

//test route GET / - pour récupéere roure les patiente du service
it("GET / - patientes du service", async () => {
  await request(app).post("/users/signup").send(newUser);
  const res = await request(app).get("/users");

  expect(res.statusCode).toBe(200);
  expect(res.body.data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        __v: expect.any(Number),
        _id: expect.any(String),
        display: expect.any(Boolean),
        lastname: expect.any(String),
        motherName: newUser.motherName,
        password: expect.any(String),
        room: newUser.room,
        token: expect.any(String),
        username: newUser.username,
      }),
    ])
  );
});
