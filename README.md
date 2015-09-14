# Smart Alarm Clock

Do you hate to get up in the morning? We cannot make it any easier, but we can at least add a little intelligence to the process. This project lets you create a "smart" alarm clock out of an Intel Edison. You can set the alarm time using your smart phone via the built-in web interface, live weather data is displayed on the LCD. Not only that, but for fans of the "quantified self" movement, the alarm clock keeps track of how long it takes you to wake up each day using cloud-based data storage.

The "smart" alarm clock requires the following components from the Grove Starter Kit Plus:

1. Intel Edison with Arduino breakout board
2. Grove Rotary Analog Sensor
3. Grove Buzzer
4. Grove Button
5. Grove RGB LCD Display

## How It Works

This "smart" alarm clock has a number of useful features.

- Set the alarm time using a web page served directly from the Edison itself, using your mobile phone.
- When the alarm goes off, the buzzer sounds, and the LCD display indicates its time to get up.
- The rotary dial can be used to adjust the brightness of the display.
- In addition, the smart alarm clock can access daily weather data via the Weather Underground API, and displays it on the LCD once you press the button when getting up.
- Optionally, store how long it takes you to get up  each day using the "Intel IoT Example Datastore" running on your own server, such as a Microsoft Azure or IBM Bluemix account.

## How To Setup

To begin, clone the Intel IoT Examples with git on your computer:

    $ git clone https://github.com/hybridgroup/intel-iot-examples.git

Not sure how to do that? [Here is an excellent guide from Github on how to get started](https://help.github.com/desktop/guides/getting-started/).

### Adding The Code To Eclipse IoT

TODO: Eclipse initial setup instructions go here...

### Connecting The Grove Sensors

![](./../../../images/alarm-clock.jpg)

You will need to have the Grove Shield connected to the Arduino-compatible breakout board, in order to plug in all the various Grove devices into the Grove shield. Make sure you have the tiny VCC switch on the Grove Shield set to the "5V" position.

Plug one end of a Grove cable into the "Rotary Analog Sensor", then connect the other end to the "A0" port on the Grove Shield.

Connect one end of a Grove cable into the "Button", then plug the other end into the "D4" port on the Grove Shield.

Plug one end of a Grove cable into the "Buzzer", then connect the other end to the "D5" port on the Grove Shield.

Connect one end of a Grove cable into the "RGB LCD", then plug the other end into any of the "I2C" ports on the Grove Shield.

### Intel Edison Setup

This example uses the `crow` web microframework library to provide a simple to use, yet powerful web server. The `crow` library requires the `libboost` package be installed on the Intel Edison, as well as adding the needed include and lib files to the Eclipse G++ Cross Compiler and G++ Cross Linker.

TODO: Instructions on adding `libboost` include and lib goes here...

This example also uses the `restclient-cpp` library to perform REST calls to the remote data server. The code for `restclient-cpp` can be found in the `lib` directory. The `restclient-cpp` library requires the `libcurl` package, which is already installed on the Intel Edison by default.

You will also want to set the current time zone to match the zone you are in. You do this using the `timedatectl` program on the Edison itself. For example:

```
timedatectl set-timezone America/Los_Angeles
```

### Running The Code On Edison

When you're ready to run the example, you can click on the "Run" icon located in the menubar at the top of the Eclipse editor.
This will compile the program using the Cross G++ Compiler, link it using the Cross G++ Linker, transfer the binary to the Edison, and then execute it on the Edison itself.


## Weather Underground Data Setup

To optionally fetch the real-time weather information, you will need to get an API key from the Weather Underground web site at http://www.wunderground.com/weather/api/

You will not be able to retrieve weather conditions without obtaining a Weather Underground API key first. You can still run the example, just without the weather data.

To run the example with the optional weather data intefgration, you need to set the `API_KEY` environment variable. You can do this in Eclipse by:

1. Select the "Run" menu and choose "Run Configurations". The "Run Configurations" dialog will be displayed.
2. Click on "alarm-clock" under "C/C++ Remote Application". This will display the information for your application.
3. Add the environment variables to the field for "Commands to execute before application" so it ends up looking like this, except using the API key that correspond to your own setup:

```
chmod 755 /tmp/alarm-clock
export API_KEY="YOURKEY"
```

4. Click on the "Apply" button to save your new environment variables.

Now when you run your program using the "Run" button, it should be able to retrieve real-time weather data from the Edison.

## Data Store Server Setup

You can optionally store the data generated by this example program in a backend database deployed using Node.js, and the Redis datastore. You use your own account on a hosted service such as Microsoft Azure or IBM Bluemix.

For information on how to setup your own cloud data server, go to:

https://github.com/hybridgroup/intel-iot-examples-datastore

### Running The Example With The Cloud Server

To run the example with the optional backend datastore you need to set the `SERVER` and `AUTH_TOKEN` environment variables. You can do this in Eclipse by:

1. Select the "Run" menu and choose "Run Configurations". The "Run Configurations" dialog will be displayed.
2. Click on "doorbell" under "C/C++ Remote Application". This will display the information for the
3. Add the environment variables to the field for "Commands to execute before application" so it ends up looking like this, except using the server and auth token that correspond to your own setup:

```
chmod 755 /tmp/alarm-clock
export SERVER="http://intel-examples.azurewebsites.net/counter/logger/alarm-clock"
export AUTH_TOKEN="YOURTOKEN"
```

4. Click on the "Apply" button to save your new environment variables.

Now when you run your program using the "Run" button, it should be able to call your server to save the data right from the Edison.

## Determining The Intel Edison IP Address

You can determine what IP address the Intel Edison is connected to by running:

    ip addr show | grep wlan

You will see output similar to:

    3: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast qlen 1000
        inet 192.168.1.13/24 brd 192.168.1.255 scope global wlan0

The IP address is shown next to `inet`. In the example above, the IP address is `192.168.1.13`
