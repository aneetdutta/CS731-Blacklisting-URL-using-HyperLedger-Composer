file="blocked_url.csv"
declare -i var1=1000
while IFS= read -r line
do
        # display $line or do somthing with $line
	printf '%s\n' "$line"
        ((var1++))
        echo "$var1"
        curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ "$class": "org.example.mynetwork.CreateAsset","asseturl": { "$class":"org.example.mynetwork.Url", "assetId": "'$var1'", "name": "'$line'", "status": true, "lastModified": "2019-04-14T12:37:00.618Z" } }' 'http://localhost:3000/api/CreateAsset'
	
done <"$file"
