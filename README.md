### IoT AI Critter Trap  
App will send text message with image when reed switch is closed

#### Overview Video
[Video](https://youtu.be/BctqOrvCoMQ)

#### Parts  - not affiliate links find cheapest price
- Trap
https://www.amazon.com/Havahart-Release-Squirrels-Chipmunks-Weasels/dp/B000BPAVCG?ref_=ast_slp_dp
- Reed Switch
https://www.amazon.com/DIYables-Magnetic-Arduino-ESP8266-Raspberry/dp/B0B3D7BM4K/ref=sr_1_4?crid=1ZIFZ839ZVZWH&keywords=raspberry+pi+reed+switch&qid=1690400635&sprefix=raspberry+pi+reed+%2Caps%2C123&sr=8-4
- Raspberry Pi 4 (or 3 or zero or...)
https://www.amazon.com/CanaKit-Raspberry-4GB-Starter-Kit/dp/B07V5JTMV9?ref_=ast_sto_dp&th=1&psc=1
- Raspberry Pi Camera - (Optional)
https://www.canakit.com/raspberry-pi-camera-v2-8mp.html?cid=usd&src=raspberrypi
- IoT Relay - (Optional won't need following two items)
https://www.amazon.com/Iot-Relay-Enclosed-High-Power-Raspberry/dp/B00WV7GMA2/ref=sr_1_21?keywords=Digital+Loggers&qid=1690400177&sr=8-21
- Solid State Relay - (Optional)
https://www.amazon.com/HiLetgo-SSR-25DA-Solid-State-Module/dp/B01N1MMSKI/ref=sr_1_2_sspa?crid=14ANG5ISGY05A&keywords=solid+state+relay+dc+to+ac&qid=1690400370&sprefix=solid+state+relay+dc+to+ac%2Caps%2C115&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1
- Switched Power Cord - (Optional)
https://www.amazon.com/Woods-Indoor-Extension-Remote-Switch/dp/B000KKND86/ref=sr_1_32?keywords=switched+power+cord&qid=1690917775&sr=8-32
- Resistors - (Optional)
https://www.amazon.com/Joe-Knows-Electronics-Resistor-Starter/dp/B06Y5Y76XX/ref=sr_1_3?crid=MNWYVZEAIKWH&keywords=joe+know+electronic+resistors&qid=1690400720&sprefix=joe+know+electronice+resistors%2Caps%2C108&sr=8-3
- Bread Board / Jumper Wires
https://www.amazon.com/Breadboard-Jumper-Solderless-Breadboards-Tweezer/dp/B0BNH7LYH3/ref=pd_bxgy_img_sccl_2/147-5053147-0953936?pd_rd_w=82sme&content-id=amzn1.sym.26a5c67f-1a30-486b-bb90-b523ad38d5a0&pf_rd_p=26a5c67f-1a30-486b-bb90-b523ad38d5a0&pf_rd_r=KCRGQ20DM31NGBGCCZBQ&pd_rd_wg=Dp2yf&pd_rd_r=0f038df9-c613-4ee6-b4a1-4dc766757c89&pd_rd_i=B0BNH7LYH3&psc=1

### Setup  
Attach Reed Swith and Optional Relay

| Reed Switch  | PI  Pin  |
|--------------|----------|
|   Lead 1     | 3V       |
|   Lead 2     | GPIO 17  |

 Optional 10K Resistor between GPIO 17 and Lead 2

| Relay Switch | PI  Pin  |
|--------------|----------|
|   Input -    | GND      |
|   Input +    | GPIO 27  |


Install Nodejs
```
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

Clone Repo  
```
git clone https://github.com/prichardsondev/raspberrypi-node-crittertrap.git
```

Switch Directories
```
cd raspberrypi-node-crittertrap
```

Install node packages 
```
npm i
```

Create .env file 
```
sudo mv .env.example .env
```

Modify .env file (you'll need twillio and cloudinary free accounts)
```
sudo nano .env
```

Save and exit  
ctrl + x  
y   

Install PM2
```
sudo npm i pm2 -g
```

Start App
```
pm2 start app.js
```
Save
```
pm2 save
```

Add to startup
```
pm2 startup
```

Run script in output from pm2 statup - copy / paste back to terminal  
Starts with "sudo env PATH=$PATH:..."  

Save
```
pm2 save
```

Restart server after code changes
```
pm2 restart app
```

#### Notes:
- Create simple and cheap version using an IoT device (esp32) from sparkfun or adafruit and a reed switch. 25 bucks or so.