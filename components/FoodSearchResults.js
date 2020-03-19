import { useState } from "react";

import NutritionFacts from "./NutritionFacts";
import SplashSVG from "./svg/SplahSVG";
import PhoneManBigSVG from "./svg/PhoneManBigSVG";

import {ADD_FOOD} from '../gql/mutations';
import {useMutation} from '@apollo/react-hooks';

export default function FoodSearchResults ({ searchResults }) {
    const [nutrInfo, setNutrInfo] = useState()
    const [addFood, {}] = useMutation(ADD_FOOD);



    const svg = (
      <div className="flex flex-col mt-40">
        <PhoneManBigSVG />
      </div>
    )

    if(!data) return <div>Loading ...</div>  

    return (
        <section className="flex flex-1 mt-20">
            {/* <FoodSearchList setNutrInfo={setNutrInfo} /> // uncomment after component is complete, delete line below*/}
            <div className="w-1/2 h-full px-20 whitespace-pre-wrap">{searchResults ? JSON.stringify(searchResults) : "Food Search List"}</div>
            <div className="w-1/2 max-h flex">
              <div className="flex-1"></div>
                {/* {nutrInfo ? <NutritionFacts data={nutrInfo} /> : svg}  //uncomment after food search list is functional, delete line below */}
                <NutritionFacts 
                  addFood={addFood} 
                  data={data}/>
              <div className="flex-1"></div>
            </div>
        </section>
    )
}

const data =  //placeholder data until we have return data from food search list component
{
    "uri" : "http://www.edamam.com/ontologies/edamam.owl#051cdaf3-ae4c-4b26-92d3-ca5b9b578834",
    "yield" : 4.0,
    "calories" : 168,
    "totalWeight" : 28.349523125,
    "dietLabels" : [ ],
    "healthLabels" : [ "SUGAR_CONSCIOUS", "LOW_SUGAR", "DAIRY_FREE", "GLUTEN_FREE", "WHEAT_FREE", "EGG_FREE", "MILK_FREE", "PEANUT_FREE", "TREE_NUT_FREE", "SOY_FREE", "FISH_FREE", "SHELLFISH_FREE", "PORK_FREE", "CRUSTACEAN_FREE", "CELERY_FREE", "MUSTARD_FREE", "SESAME_FREE", "LUPINE_FREE", "MOLLUSK_FREE", "ALCOHOL_FREE", "NO_OIL_ADDED" ],
    "cautions" : [ ],
    "totalNutrients" : {
      "ENERC_KCAL" : {
        "label" : "Energy",
        "quantity" : 168.67966259375,
        "unit" : "kcal"
      },
      "FAT" : {
        "label" : "Fat",
        "quantity" : 13.44617890470338,
        "unit" : "g"
      },
      "FASAT" : {
        "label" : "Saturated",
        "quantity" : 6.7216716733898645,
        "unit" : "g"
      },
      "PROCNT" : {
        "label" : "Protein",
        "quantity" : 10.083925289046622,
        "unit" : "g"
      },
      "CHOLE" : {
        "label" : "Cholesterol",
        "quantity" : 39.122341912500005,
        "unit" : "mg"
      },
      "NA" : {
        "label" : "Sodium",
        "quantity" : 392.07390481875007,
        "unit" : "mg"
      },
      "CA" : {
        "label" : "Calcium",
        "quantity" : 168.67966259375,
        "unit" : "mg"
      },
      "FE" : {
        "label" : "Iron",
        "quantity" : 0.3657088374980152,
        "unit" : "mg"
      }
    },
    "totalDaily" : {
      "ENERC_KCAL" : {
        "label" : "Energy",
        "quantity" : 8.4339831296875,
        "unit" : "%"
      },
      "FAT" : {
        "label" : "Fat",
        "quantity" : 20.686429084159048,
        "unit" : "%"
      },
      "FASAT" : {
        "label" : "Saturated",
        "quantity" : 33.608358366949325,
        "unit" : "%"
      },
      "PROCNT" : {
        "label" : "Protein",
        "quantity" : 20.167850578093244,
        "unit" : "%"
      },
      "CHOLE" : {
        "label" : "Cholesterol",
        "quantity" : 13.040780637500001,
        "unit" : "%"
      },
      "NA" : {
        "label" : "Sodium",
        "quantity" : 16.336412700781253,
        "unit" : "%"
      },
      "CA" : {
        "label" : "Calcium",
        "quantity" : 16.867966259375,
        "unit" : "%"
      },
      "FE" : {
        "label" : "Iron",
        "quantity" : 2.031715763877862,
        "unit" : "%"
      }
    },
    "ingredients" : [ {
      "parsed" : [ {
        "quantity" : 1.0,
        "measure" : "ounce",
        "food" : "WISCONSIN CHEESE, WHITE CHEESE CURDS & MEAT STICKS",
        "foodId" : "food_accuw2hb3ysg0yavs90pvbcnxkej",
        "foodContentsLabel" : "BEEF; PORK; SALT; WATER; DEXTROSE; SUGAR; SODIUM ERYTHORBATE; SODIUM NITRITE; LACTIC ACID STARTER CULTURE; LAMB CASINGS.",
        "weight" : 28.349523125,
        "retainedWeight" : 28.349523125,
        "measureURI" : "http://www.edamam.com/ontologies/edamam.owl#Measure_ounce",
        "status" : "OK"
      } ]
    } ]
  }