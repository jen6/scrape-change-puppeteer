#!/bin/sh
npm install
cat ./document_list.csv | while read line
do
  NAME=$(echo $line | awk '{print $1}')
  URL=$(echo $line | awk '{print $2}')
  QUERY=$(echo $line | awk '{print $3}')
  echo "$NAME"
  node src/app.js "${URL}" "${QUERY}" > documents/"${NAME}".md
done

