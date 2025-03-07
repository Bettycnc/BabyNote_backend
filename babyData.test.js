const request = require('supertest');
const app = require('./app');
const Baby = require('./models/baby');
const Alimentation = require('./models/BabyData/alimentation');
const Elimination = require('./models/BabyData/elimination');
const User = require("./models/users");


const newBaby = {
  name: 'TestBaby',
  birthday: '2023-01-01T00:00:00.000Z',
  birthWeight: 3500,
};

let babyId; //creation de la variable pour l'id

beforeEach(async () => {
  await Baby.deleteOne({ name: newBaby.name }); //supprime le bébé pour eviter les erreurs 
});

it('POST /baby - Créer un bébé', async () => {
  const res = await request(app).post('/baby').send(newBaby); //recupère la logique de la routes post afin d'ajouter un bébé

  //après l'ajout du bébé les resultats doivent etre ce qu'il y a entre parenthèse: 
  expect(res.statusCode).toBe(200);
  expect(res.body.result).toBe(true);
  expect(res.body).toHaveProperty('baby');
  expect(res.body.baby).toHaveProperty('name', newBaby.name);
  expect(res.body.baby).toHaveProperty('birthday', newBaby.birthday);
  expect(res.body.baby).toHaveProperty('birthWeight', newBaby.birthWeight);
});

test('POST /babyData/:id/alimentation - Ajouter une alimentation Biberon', async () => {
    const baby = await new Baby(newBaby).save();
    babyId = baby._id;
    const alimentationData = {
      date: '2025-03-07T10:00:00Z',
      feedingBottle: [
        { feedingBottlePresent: true, amount: 120 }
      ],
      breastFeeding: [],
    };
    
    const res = await request(app).post(`/babyData/${babyId}/alimentation`).send(alimentationData);
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', "Alimentation enregistrée");
    expect(res.body).toHaveProperty('data');
  
    const { data } = res.body;
  
    expect(data).toMatchObject({
      date: expect.any(String),
      feedingBottle: expect.arrayContaining([
        expect.objectContaining({
          feedingBottlePresent: alimentationData.feedingBottle[0].feedingBottlePresent,
          amount: alimentationData.feedingBottle[0].amount
        })
      ]),
      breastFeeding: alimentationData.breastFeeding,
    });
});
  
test('POST /babyData/:id/alimentation - Ajouter une alimentation Allaitement', async () => {
    const baby = await new Baby(newBaby).save();
    babyId = baby._id;
    const alimentationData = {
      date: '2025-03-07T10:00:00Z',
      feedingBottle: [],
      breastFeeding: [
        {breastFeedingPresent: true,
        breast: 'Gauche',
        duration: 20,
        foodSupplement: []}
      ],
    };
    
    const res = await request(app).post(`/babyData/${babyId}/alimentation`).send(alimentationData);
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', "Alimentation enregistrée");
    expect(res.body).toHaveProperty('data');
  
    const { data } = res.body;
  
    expect(data).toMatchObject({
      date: expect.any(String),
      breastFeeding: expect.arrayContaining([
        expect.objectContaining({
            breastFeedingPresent: alimentationData.breastFeeding[0].breastFeedingPresent,
            breast: [alimentationData.breastFeeding[0].breast],
            duration: alimentationData.breastFeeding[0].duration,
            foodSupplement: alimentationData.breastFeeding[0].foodSupplement,
        })
      ]),
      feedingBottle: alimentationData.feedingBottle,
    });
});


it('POST /baby/:id/elimination - Ajouter une élimination', async () => {
    const baby = await new Baby(newBaby).save();
    babyId = baby._id;
  const eliminationData = {
    date: '2025-03-07T12:00:00Z',
    urine: true,
    gambling: false,
  };
  
  const res = await request(app).post(`/babyData/${babyId}/elimination`).send(eliminationData);

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('message', 'Elimination enregistrée');
  expect(res.body).toHaveProperty('data');
  expect(res.body.data).toHaveProperty('urine', eliminationData.urine);
  expect(res.body.data).toHaveProperty('gambling', eliminationData.gambling);
});


it('POST /baby/:id/temperature - Ajouter une temperature', async () => {
    const baby = await new Baby(newBaby).save();
    babyId = baby._id;
    const temperatureData = {
      date: '2025-03-07T12:00:00Z',
      temperature: 37,
    };
    
    const res = await request(app).post(`/babyData/${babyId}/temperature`).send(temperatureData);
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'temperature enregistrée');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('temperature', temperatureData.temperature);
});


it('POST /baby/:id/care - Ajouter des soins', async () => {
    const baby = await new Baby(newBaby).save();
    babyId = baby._id;
    const CareData = {
      date: '2025-03-07T12:00:00Z',
      cordCare : true,
      faceCare: false,
      bath: true,
    };
    
    const res = await request(app).post(`/babyData/${babyId}/care`).send(CareData);
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Soins enregistrés');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('bath', CareData.bath);
    expect(res.body.data).toHaveProperty('cordCare', CareData.cordCare);
    expect(res.body.data).toHaveProperty('faceCare', CareData.faceCare);
});


it('POST /baby/:id/care - Ajouter un nouveau poids', async () => {
    const baby = await new Baby(newBaby).save();
    babyId = baby._id;
    const weightData = {
      date: '2025-03-07T12:00:00Z',
      weight : 3200,
    };
    
    const res = await request(app).post(`/babyData/${babyId}/weight`).send(weightData);
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Poids enregistré');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('weight', weightData.weight);
});

