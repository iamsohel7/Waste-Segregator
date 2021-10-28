
async function getData() {
    fetch('http://www.instagram.com/sustainable_alchemists/?__a=1',
	{method:"PUT", headers:
		{'Content-Type': "application/json",
		 'accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,/;q=0.8", 
		 'user-agent':"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0",
		 'Cookie': "csrftoken=y2xOflRO7CjZDszXqVit20iOkB0NVIYH; mid=YSy98QAEAAF8KmtITmkoM2b_4I1Q; ig_did=63E0ACB6-0036-4161-B7CE-AA5E9F6FD4AC; ig_nrcb=1"
		 }
	}).then(response => response.json()).then(data=>{console.log('success:',data)}).catch((error)=>{console.log('Error:',error)})
}


let data = getData();

