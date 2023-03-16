# PokeMap

## Contexte
Les données sur les Pokemon avec leurs noms, leurs niveaux, ainsi que leur taux d'apparition proviennent de ce site web : https://strategywiki.org/wiki/Pok%C3%A9mon_FireRed_and_LeafGreen/

Pour compléter nos données, nous utiliserons également ce site : https://www.serebii.net/pokearth/kanto/index.shtml

Serebii est spécialisé sur les données spécifique de chacun des pokémon (taille, poids, taux de capture, ...) contrairement à l'autre site qui se concentre essentiellement sur les rencontres des pokémon selon les zones du jeu.

Les éléments graphiques des pokémon que nous utiliserons proviennent du site suivant qui fournit les sprites. (Les éléments interactifs seront en SVG alors que les autres seront au format JPG/PNG) :

https://www.spriters-resource.com/game_boy_advance/pokemonfireredleafgreen/sheet/3713/

Concernant les "fun facts" du dessin animé, aucun site ne ressence les similarités avec le jeu vidéo. Nous allons alors visionner les 51 épisodes de la saison 1 (La ligue indigo) afin de pouvoir récupérer les moments intéressants que nous proposerons ensuite sur notre site. 

Nous serons aidés de ce site web qui nous permet de recenser l'ensemble des épisodes de la région de Kanto, endroit où le jeu se déroule dans la version de Pokémon Rouge Feu. https://bulbapedia.bulbagarden.net/wiki/List_of_anime_episodes

## Description

Les données n'étant pas disponible dans une forme utilisable, nous devrons alors les récolter depuis le wiki et ensuite les formater pour les rendre utilisables dans notre contexte d'application. 

Elles seront alors formattées au format JSON afin de pouvoir les exploiter. Voici un aperçu de la structure utilisée. 

```json
{
    "route1" : {
        "herbe" : {
            "pokemon" :[
                {
                    "name" : "Pidgey",
                    "lvl" : "2-5",
                    "Rate" : "50"
    
                },
                {
                    "name": "Rattata",
                    "lvl" : "2-4",
                    "Rate" : "50"
                }
            ]
            
        }
    },
    "route22" : {
        "herbe" : {
            "pokemon" :[
                {
                    "name" : "Rattata",
                    "lvl" : "2-5",
                    "Rate" : "45"
    
                },
                {
                    "name": "Mankey",
                    "lvl" : "2-5",
                    "Rate" : "45"
                },
                {
                    "name": "Spearow",
                    "lvl" : "3-5",
                    "Rate" : "10"
                }
            ]
            
        },
        "eau" : {
            "surf": {
                "pokemon" :[
                    {
                        "name" : "Psyduck",
                        "lvl" : "20-40",
                        "Rate" : "100"
        
                    }
                ]
            },
            "oldRod": {
                "pokemon" :[
                    {
                        "name" : "Magikarp",
                        "lvl" : "5",
                        "Rate" : "100"
        
                    }
                ]
            } 
        }
    }
}
```

## But
PokeMap permet aux joueurs du jeu **Pokemon Rouge Feu** d'avoir une aide visuel lors de leur chasse de pokémon dans leur nouvelle aventure ou dans leur quête de compléter leur pokédex. 

Notre application permet d'avoir une meilleure visualisation des zones dans lesquelles apparaissent les pokémon avec leur taux d'apparition. L'utilisateur pourra explorer la carte librement à travers la région de Kanto en intéragissant avec l'interface.

La carte met aussi en parallèle les similarités entre les passages dans le dessin animé avec le héros Sacha et son fidèle compagnon Pikachu et le jeu vidéo.

## Références

Notre référence principale est Serebii.net qui recense les apparitions de pokémon par zone dans l'ensemble des jeux vidéo Pokémon. 

Ce site permet aux joueurs de savoir où et comment capturer certains pokémon. De plus, le site offre la possibilité de connaître les équipes des dresseurs à affronter tout au long de l'aventure : https://www.serebii.net/pokearth/kanto/index.shtml

Nous ne pouvons pas démontrer quelle source de données est utilisée pour ce site.

Une autre référence est ce post de blog datant de 2004 qui recense l'ensemble des apparitions de pokémon dans la version Rouge Feu.
https://gamefaqs.gamespot.com/gba/918915-pokemon-firered-version/faqs/32720

## Wireframes
<p align="center"><img src="/src/img/wireframes/01.jpg" width="800"></p>
<p align="center"><img src="/src/img/wireframes/02.jpg" width="800"></p>
<p align="center"><img src="/src/img/wireframes/03.jpg" width="800"></p>
<p align="center"><img src="/src/img/wireframes/04.jpg" width="800"></p>
<p align="center"><img src="/src/img/wireframes/05.jpg" width="800"></p>
<p align="center"><img src="/src/img/wireframes/06.jpg" width="800"></p>
<p align="center"><img src="/src/img/wireframes/07.jpg" width="800"></p>

