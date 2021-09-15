init:
	npm install && cp .env.locale .env 
build: 
	cp .env.prod .env  && npm run build && npm run generate && sudo rm -rf app && zip -r app.zip dist && cp .env.locale .env  