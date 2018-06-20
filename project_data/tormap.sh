# Script for processing tormap KML data into GeoJSON
# Created by joeblankenship1
GREEN='\033[1;32m'
NC='\033[0m' # No Color

if [ -d "json_data" ];
then
	printf "${GREEN}\nYour json_data directory already exists. Should I overwrite? [y/N] ${NC}"
	read -r -p "" response
	response=${response,,}    # tolower
	if [[ "$response" =~ ^(yes|y)$ ]]
	then
    	printf "${GREEN}\nOverwriting directory contents now...${NC}"
	else
		printf "${GREEN}\nStopping processes now. ${NC}"
		exit

	fi
else
	printf "${GREEN}\nCreating Directories${NC}"
	mkdir source_data
	mkdir json_data
fi

printf "${GREEN}\nProcessing Stable Node Data...${NC}"
curl -LOk https://tormap.void.gr/maps/tormap_stable.kml && mv tormap_stable.kml source_data/tormap_stable.kml
ogr2ogr -f GeoJSON json_data/tormap_stable.json source_data/tormap_stable.kml && mapshaper json_data/tormap_stable.json -filter-fields Name,description -o format=geojson precision=.0001 json_data/tormap_stable_p.json && rm json_data/tormap_stable.json
printf "${GREEN}\nProcessing Fast Stable Node Data...${NC}"
curl -LOk https://tormap.void.gr/maps/tormap_stableFast.kml && mv tormap_stableFast.kml source_data/tormap_stableFast.kml
ogr2ogr -f GeoJSON json_data/tormap_stableFast.json source_data/tormap_stableFast.kml && mapshaper json_data/tormap_stableFast.json -filter-fields Name,description -o format=geojson precision=.0001 json_data/tormap_stableFast_p.json && rm json_data/tormap_stableFast.json
printf "${GREEN}\nProcessing Exit Node Data...${NC}"
curl -LOk https://tormap.void.gr/maps/tormap_exit.kml && mv tormap_exit.kml source_data/tormap_exit.kml
ogr2ogr -f GeoJSON json_data/tormap_exit.json source_data/tormap_exit.kml && mapshaper json_data/tormap_exit.json -filter-fields Name,description -o format=geojson precision=.0001 json_data/tormap_exit_p.json && rm json_data/tormap_exit.json
printf "${GREEN}\nProcessing Fast Exit Node Data...${NC}"
curl -LOk https://tormap.void.gr/maps/tormap_exitFast.kml && mv tormap_exitFast.kml source_data/tormap_exitFast.kml
ogr2ogr -f GeoJSON json_data/tormap_exitFast.json source_data/tormap_exitFast.kml && mapshaper json_data/tormap_exitFast.json -filter-fields Name,description -o format=geojson precision=.0001 json_data/tormap_exitFast_p.json && rm json_data/tormap_exitFast.json
printf "${GREEN}\nProcessing Authority Node Data...${NC}"
curl -LOk https://tormap.void.gr/maps/tormap_auth.kml && mv tormap_auth.kml source_data/tormap_auth.kml
ogr2ogr -f GeoJSON json_data/tormap_auth.json source_data/tormap_auth.kml && mapshaper json_data/tormap_auth.json -filter-fields Name,description -o format=geojson precision=.0001 json_data/tormap_auth_p.json && rm json_data/tormap_auth.json
printf "${GREEN}\nProcessing Bad Node Data...${NC}"
curl -LOk https://tormap.void.gr/maps/tormap_bad.kml && mv tormap_bad.kml source_data/tormap_bad.kml
ogr2ogr -f GeoJSON json_data/tormap_bad.json source_data/tormap_bad.kml && mapshaper json_data/tormap_bad.json -filter-fields Name,description -o format=geojson precision=.0001 json_data/tormap_bad_p.json && rm json_data/tormap_bad.json
printf "${GREEN}\nProcessing Other Node Data...${NC}"
curl -LOk https://tormap.void.gr/maps/tormap_other.kml && mv tormap_other.kml source_data/tormap_other.kml
ogr2ogr -f GeoJSON json_data/tormap_other.json source_data/tormap_other.kml && mapshaper json_data/tormap_other.json -filter-fields Name,description -o format=geojson precision=.0001 json_data/tormap_other_p.json && rm json_data/tormap_other.json

printf "${GREEN}\nDelete the source KML directory? [y/N]${NC}"
read -r -p "" response
response=${response,,}    # tolower
if [[ "$response" =~ ^(yes|y)$ ]]
then
    rm -rf source_data
    printf "${GREEN}\nAll Done! Your GeoJSON files should have _p to indicate they are processed. \n${NC}"
else
	printf "${GREEN}\nYour source_data files are saved. ${NC}"
    printf "${GREEN}\nAll Done! Your GeoJSON files should have _p to indicate they are processed. \n${NC}"
fi