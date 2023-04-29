up:
	sudo docker compose up -d

shell:
	make up;
	sudo docker compose exec frontend bash

down:
	sudo docker compose stop

logs:
	sudo docker compose logs -f