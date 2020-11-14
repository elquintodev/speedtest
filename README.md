# Speedtest (Dev) By El Quinto

### Requirement
* Make a function that will calculate the internet speed.
* After that there will be a start button that will start the function. 
* After completion of function values will get from the function and add to database(mysql)
* That values will show the bottom of the page in a data-table
* There will be a delete button too that will delete the row

Note: adding, deleting, and refreshing the values will be done by angular js for backend use php with codeignitor
Sample format:   https://fast.com/

### How to Install
* Install Node
* Install Docker 
* See [here](https://docs.docker.com/docker-for-windows/install/) how to install for windows
* See [here](https://docs.docker.com/engine/install/ubuntu/) how to install for Ubuntu

### How to Boot
```bash
# install package for angular dev
$ cd speedtest-client
$ npm install

# start up the containers
$ docker-compose up -d --build

# look for the api container id
$ docker ps
# run db migration
$ docker exec -ti <container_id> bash -c "php spark migrate"
```