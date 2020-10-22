
echo "\n\n\nNpm install:"
npm install

echo "\n\n\nCopy .env file:"
file="./.env.docker"
if [ -f "$file" ]
then
	echo "$file found."
	cp $file ./.env
	echo ".env created"
else
	echo "$file not found."
	exit 1
fi

echo "\n\n\nRun migration:"
adonis migration:run --force

adonis acl:role client

adonis acl:role admin

echo "\n\n\nStart node server:"
adonis serve --dev --polling