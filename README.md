# Make Your Question  

Bliss application test - Make Your Question  

![image](https://user-images.githubusercontent.com/84861666/226640366-d41e0f31-3231-4606-a315-b91b3f61116b.png)

## How to clone the project

On your terminal, run the following command:

```bash
git clone git@github.com:VictorMonteiro7/bliss-test.git // SSH
```
or
```bash
git clone https://github.com/VictorMonteiro7/bliss-test.git // HTTPS
```
After, copy the .env.example file to .env and change to your local app url.

```bash
cd bliss-test && cp .env.example .env
```

>Atention:  
>If you aren't using Docker, you must change the VITE_API_URL variable to http://localhost:5173.
---

For the next steps, is recommended to use Docker. If you don't have it installed, you can download it [here](https://docs.docker.com/get-docker/).

## How to run the project

If you are using Docker, run the following command:

```bash
cd bliss-test && docker-compose up --build -d
```

If not, run the following commands:

```bash
cd bliss-test && npm install
```

> After the dependencies are installed, run the following command:
```bash
npm run dev
```

#### ATENTION  
If you aren't using Docker, your Node version must be 18.15.0 or higher. 

## How to see the project

After running the project, you can access it on your browser by typing the following url:

> If you are using Docker:
```bash
http://localhost:8000
```

> If not:
```bash
http://localhost:5173
```
--- 

## Dependencies
* floating-vue (Used to create floating notification in some buttons/components)
* vue-toast-notification (Used to create tooltips)
* vue-router (Used to create routes)
* vuex (Used to create a global state)
* SaSS (Used to create styles)


#### Author
Victor Monteiro - [Linkedin](https://www.linkedin.com/in/ovictormonteiro/) - [Github](https://www.github.com/VictorMonteiro7)
