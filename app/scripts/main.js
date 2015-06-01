$(document).ready(function(){

  

  var client = new Usergrid.Client({

    orgName: "larsj",
    appName: "sandbox",
    logging: true,
    buildCurl: true

  });

  var uuid;

  initAnimals();

  function initAnimals(){


    var options = {

      type: "animal"
    }

    console.log("getEntity");

    // get existing data stored in Apigee
    client.getEntity(options, function(error, result){

      if(error || result.entities[0] === undefined){

        // if no data exists, create data

        console.log("Get Error: "+ error);

        createAnimalsData();

      }else{

        console.log("Get Result: "+result);

        // if data exists, store uuid of data

        uuid = result.entities[0].uuid;

        // todo - display data
      }
    });


    displayAnimals(getAnimals());

    $("#reset-button").on("click", resetAnimals);
    $("#add-button").on("click", addAnimal);
  }

  function createAnimalsData(){

    // save default data in Apigee 

    var createOptions = {

          type: "animal",
          data: "test"
        }

        client.createEntity(createOptions, function(createError, createResult){

            if(createError){

              console.log("Create Error: "+ createError);

            }else{

              console.log("Create Result: "+createResult);
            }

        });
  }

  function resetAnimals(e){

    saveAnimals(initAnimalsData());
    displayAnimals(getAnimals());
    e.preventDefault();
  }

  function addAnimal(e){

    var name = $("#animal-name").val();
    var description = $("#animal-description").val();
    var size = $("#animal-size").val();
    var birthDate = $("#animal-birth").val();
    var imageUrl = $("#animal-image-url").val();
    var entry = {"name":name,"description":description,"size":size,"birthDate":birthDate,"imageUrl":imageUrl};
    var existingAnimals = getAnimals();
    existingAnimals.kittens.unshift(entry);
    saveAnimals(existingAnimals);
    displayAnimals(getAnimals());
    resetForm();
    e.preventDefault();
  }

  function resetForm(){

    $("#animal-name").val("");
    $("#animal-description").val("");
    $("#animal-size").val("");
    $("#animal-birth").val("");
    $("#animal-image-url").val("");
  }

  function displayAnimals(animalsData){

   var $kittenList = $('#kitten-list');
    $kittenList.html(" ");
    $.each(animalsData.kittens, function(index, kitten){
      $kittenList.append("<div class='panel panel-default'><div class='panel-heading'>"+kitten.name+"</div><div class='panel-body'><img class='thumbnail' src='"+kitten.imageUrl+"' alt=''>"+kitten.description+"<br>Size: "+kitten.size+"<br>Birth date: "+kitten.birthDate+"</div></div>");
    });
  }

  function saveAnimals(animalsData){

    localStorage.setItem('aaaAnimals', JSON.stringify(animalsData));
  }

  function getAnimals(){

    var animalsString = localStorage.getItem('aaaAnimals');

    if(animalsString === null){

      return(initAnimalsData());

    }else{

      return(JSON.parse(animalsString));
    }
  }

  function initAnimalsData(){

    var animals = {

      "kittens":[
        {"name":"Simba","description":"Simba made the transition from the printed page to the television screen during the 1960s. It is very difficult to find homes for line drawings like Simba, so we hope to find that special family who will take this Japanese sweetheart into their hearts and color inside the lines.","size":"Animated","birthDate":"1950","imageUrl":"images/simba_th.jpg"},
        {"name":"Baby","description":"Baby is a leopard, imported from South America by the fictional brother of Katharine Hepburn. Though he has a reputation for eating car upholstery and trucks full of chickens, we think that he could be a wonderful housepet for  the right madcap heroine and/or paleontologist","size":"Medium","birthDate":"1938","imageUrl":"images/baby_th.gif"},
        {"name":"Tigger","description":"Originally a character in a children's book, before Disney brought him unwelcome fame and attention, Tigger is now looking for a quiet home where he can live out of the public eye and not have to leap in the air all the time. He would prefer to be the only cat, and especially would like to avoid homes with fat honey-obsessed bears","size":"Medium","birthDate":"1924","imageUrl":"images/tigger_th.png"},
        {"name":"Jespah, Gopa and Little Elsa","description":"These three siblings must be adopted together, and allowed to live free. They will grow to be as much as 500 pounds each. If you're interested in adopting this lovable trio, please be aware that each one will eat as much as 90 pounds of meat at every meal -- preferably zebra, antelope or buffalo.  So budget accordingly!","size":"Very, very large","birthDate":"1966","imageUrl":"images/bornfree_th.jpg"},
        {"name":"Grumpy Cat","description":"Grumpy Cat is a notoriously foul-tempered feline, with world-wide renown, prone to complaining about everything and everyone in his life. His new Forever Friend will need a strong sense of self-esteem and a willingness to be groused about in public.","size":"Small","birthDate":"2012","imageUrl":"images/grumpy_th.jpg"},
        {"name":"Simba 2","description":"Simba was orphaned at an early age and would like to find a new home free from family dysfunction or murderous relatives. He gets along well with other animals,especially meerkats and warthogs","size":"Mighty","birthDate":"1994","imageUrl":"images/lionking_th.jpg"}
      ]
    }

    return(animals);
  }

  function initAnimalsData2(){

    var animals = [
        {"name":"Simba","description":"Simba made the transition from the printed page to the television screen during the 1960s. It is very difficult to find homes for line drawings like Simba, so we hope to find that special family who will take this Japanese sweetheart into their hearts and color inside the lines.","size":"Animated","birthDate":"1950","imageUrl":"images/simba_th.jpg"},
        {"name":"Baby","description":"Baby is a leopard, imported from South America by the fictional brother of Katharine Hepburn. Though he has a reputation for eating car upholstery and trucks full of chickens, we think that he could be a wonderful housepet for  the right madcap heroine and/or paleontologist","size":"Medium","birthDate":"1938","imageUrl":"images/baby_th.gif"},
        {"name":"Tigger","description":"Originally a character in a children's book, before Disney brought him unwelcome fame and attention, Tigger is now looking for a quiet home where he can live out of the public eye and not have to leap in the air all the time. He would prefer to be the only cat, and especially would like to avoid homes with fat honey-obsessed bears","size":"Medium","birthDate":"1924","imageUrl":"images/tigger_th.png"},
        {"name":"Jespah, Gopa and Little Elsa","description":"These three siblings must be adopted together, and allowed to live free. They will grow to be as much as 500 pounds each. If you're interested in adopting this lovable trio, please be aware that each one will eat as much as 90 pounds of meat at every meal -- preferably zebra, antelope or buffalo.  So budget accordingly!","size":"Very, very large","birthDate":"1966","imageUrl":"images/bornfree_th.jpg"},
        {"name":"Grumpy Cat","description":"Grumpy Cat is a notoriously foul-tempered feline, with world-wide renown, prone to complaining about everything and everyone in his life. His new Forever Friend will need a strong sense of self-esteem and a willingness to be groused about in public.","size":"Small","birthDate":"2012","imageUrl":"images/grumpy_th.jpg"},
        {"name":"Simba 2","description":"Simba was orphaned at an early age and would like to find a new home free from family dysfunction or murderous relatives. He gets along well with other animals,especially meerkats and warthogs","size":"Mighty","birthDate":"1994","imageUrl":"images/lionking_th.jpg"}
      ];
    

    return(animals);
  }
});