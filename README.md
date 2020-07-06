# CS731-Blacklisting-URL-using-HyperLedger-Composer

This project aims at developing an URL blacklisting system in blockchain using HyperLedger com-
poser. Our work focuses on blacklisting malicious urls within an organizational network(consider a
network of users in an University). This will prevent the users within the organization from falling
in victim of phishing attacks and downloading malwares which will result in infecting the large
part of the network. In conventional systems the blacklisting urls within an organization solely
depends on the network administrator but here we tried to develop this system using blockchain
so that we do not have to put our trust on the network administrator. The solution is developed
for particular organization so using permissioned blockchain will be more useful.

Project Demo Link: https://www.youtube.com/watch?v=L4RzZJW6QWs

----------------------- URL Blacklisting Project-------------------------

1. Unzip the content and enter into the directory where it is unzipped.
2. Go to "fabric-tools" directory and run the following command :
	
	./startfabric.sh

3. As we have created the .bna(business network archive) file with latest version 0.0.27.bna
   we need to deploy the business network. To install the business network, from the
   "iit-network" directory(the name of our network), run the following command :

	composer network install --card PeerAdmin@hlfv1 --archiveFile 
        iitk-network@0.0.27.bna

4. To start the business network, run the following command :

	composer network start --networkName iitk-network --networkVersion 
	0.0.27 --networkAdmin admin --networkAdminEnrollSecret adminpw --card 
	PeerAdmin@hlfv1 --file networkadmin.card

5. To import network admin identity, run the following command :

	composer card import --file networkadmin.card

6. We can check whether the business network has been successfully deployed or not by using 
   ping :

	composer network ping --card admin@iitk-network

7. Now we have to create REST API. Go to "iitk-network" directory and run the following command :

	composer-rest-server

	Enter the name of the business network card to use: admin@iitk-network
	Specify if you want namespaces in the generated REST API: never use namespaces
	Specify if you want to use an API key to secure the REST API: No
	Specify if you want to enable authentication for the REST API using Passport: No
	Specify if you want to enable the explorer test interface: Yes
	Specify a key if you want to enable dynamic logging: No
	Specify if you want to enable event publication over WebSockets: Yes
	Specify if you want to enable TLS security for the REST API: No 

   Thus the generated API is connected to the deployed blockchain and business network. The rest server
   can now be accessed from localhost:3000.

8. Now run the composer playground using the following command :
 	
	composer-playground

   By default we enter as "admin". Admin can create students, faculty, Urls and do transactions.
   
   Now create students and faculty as well as Urls. Then go to "ID registry" on top right corner
   and "issue new id" as "Student" and "Faculty".

9. Then we can create angular frontend using "yoeman" tool by using the following command :

	yo hyperledger-composer:angular

 	Do you want to connect to a running Business Network? Yes
	Project name: Url
	Description: url blacklisting
	Author name: team100
	Author email: aneet@cse.iitk.ac.in
	License: Apache-2.0
	Name of the Business Network card: admin@iitk-network
	Do you want to generate a new REST API or connect to an existing REST API?  Connect to an existing REST API
	REST server address: http://localhost
	REST server port: 3000
	Should namespaces be used in the generated REST API? Namespaces are not used

10. Now go to "Url" directory and run the following command :

	npm start

    Then the angular frontend can be accessed through "localhost:4200".



-----------------------Rules(Everything was not visible in video demo due to time contraint!)---------------------

1. Admin, students and Faculty can view the list of URLs that are blocked or unblocked.
2. Admin can create students, faculty, Urls and make transaction "Block_unblock".
3. Students can only add URLs to the URL list. But they cannot create another students, faculty and will not be able
   to submit transaction to make change certain URLs from blocked to unblocked or vice versa.
4. Faculty can add URLs as well as make transaction to change state of the URLs(from blocked to unblocked or vice versa). 
   But they cannot add students or faculty. Only Admin is allowed to do that. 



--------------------------Additional Features(Due to time constraint we haven't showed this up!)---------------------------

1. In our system admin can download the list of malicious IPs from some external API(http://api.cybercure.ai) and update
   this list at regular interval.
2. This list of IPs are blocked in the URL Blacklisting through "CreateAsset" transaction by the admin. So we have provided
   one Python script that will download the list of malicious IPs from API and store in a .csv file and a shell script
   which will invoke the "CreateAsset" transaction to block this list of IPs.




-------------------------Limitations-----------------------------------

1. Hyperledger Composer does not support role based endorsement within a single organisation.So the Endorsement policy is
   not reflected in the composer level.
2. Endorsement policy would have been much more practical if we use Hyperledger Fabric.



