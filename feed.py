import unirest

response = unirest.get("http://api.cybercure.ai/feed/get_url",  headers={ "Accept": "application/json" }, params={ "output": "csv" })

urls=response.body['data']['urls']
thefile = open('blocked_url.csv', 'a')
#print(urls)
for item in urls:
    print(item)
    print>>thefile,item
