// Global variables
var beginBtn = $("#beginButton");
var form = $("form");
var pageValid = false; // Keeps track of whether page is in a vlaid state or not.

//---------------
// Section 1
//---------------
// Populates section one of the form on click of the begin button.
beginBtn.click(function() {
    populateSectionOne();
    beginBtn.remove();
    createBtn("#bottomBtnContainer", "button", "continueBtn1", "Continue");
    $("#continueBtn1").wrap("<a href=#top></a>");
    $("#continueBtn1").addClass("btn");
    $("#bottomBtnContainer").append("<p>25% Complete</p>");
    $("#bottomBtnContainer").append("<progress value=1 max=4></progress>");
});

// Shows or hides the help button content for section one on click.
form.on("click", "#helpButton1", function () {
    var content = $("#helpBtnContent");
    if(content.attr("class") == "helpBtnDisplay hide"){
        content.removeClass("hide")
    } else {
        content.addClass("hide");
    }
});

// Validates the form input elements every time a change is detected.
$(form).on("change", "input", function () {
    validate();
});

// Validates the form select elements every time a change is detected.
$(form).on("change", "select", function () {
    validate();
});

// Validates birthday year in personal details.
$(form).on("input change blur", "#bDay", function () {
    bdayDateValidation();
});

// Function for populating section one of the form.
function populateSectionOne() {
    form.addClass("formBorder");
    createBtn("#helpBtnContainer", "button", "helpButton1", "Help?");
    $("#helpButton1").addClass("helpButton");
    $("#questionaire1").append("<h3>About You</h3>");
    $("#questionaire1").append("<fieldset id=personalDetails><legend>Personal Details</legend></fieldset>");

    createErrorLbl("#personalDetails", "fName");
    createInput("#personalDetails", "fName", "First Name:", "text", "fName");

    createErrorLbl("#personalDetails", "mName");
    createInput("#personalDetails", "mName", "Middle Name (Optional):", "text", "mName");

    createErrorLbl("#personalDetails", "surname");
    createInput("#personalDetails", "surname", "Surname:", "text", "surname");

    createErrorLbl("#personalDetails", "gender");
    $("#personalDetails").append("<label>Gender:<select id=gender><option value=''></option><option value=Male>Male</option><option value=Female>Female</option><option value=Other>Other</option></select></label>");

    createErrorLbl("#personalDetails", "bDay");
    createInput("#personalDetails", "bDay", "Birthday:", "date", "bDay");

    createErrorLbl("#personalDetails", "age");
    createInput("#personalDetails", "age", "Age:", "number", "age");

    createErrorLbl("#personalDetails", "occupation");
    createInput("#personalDetails", "occupation", "Occupation:", "text", "occupation");

    createErrorLbl("#personalDetails", "interests");
    $("#personalDetails").append("<label class=formElementExtraPadding>Interests/Hobbies:<select id=interests multiple=true size=3><option value=Art>Art</option><option value=History>History</option><option value=Technology>Technology</option><option value=Sport>Sport</option><option value=Film>Film</option><option value=Photography>Photography</option><option value=Nature>Nature</option><option value=Architecture>Architecture</option><option value=Sociology>Sociology</option><option value=Conservation>Conservation</option><option value=Wildlife>Wildlife</option><option value=Wine>Wine</option><option value=Cooking>Cooking</option></select></label>");

    $("#personalDetails").append("<div id=partnerContainer></div>");
    $("#partnerContainer").append("<label>Do you have a partner?<input type=checkbox name=hasPartner value=True id=hasPartner></label>");

    $("#personalDetails").append("<div id=childrenContainer></div>");
    $("#childrenContainer").append("<label>Do you have any children?<input type=checkbox name=hasChildren value=True id=hasChildren></label>");

    // Event handlers for checkbox toggles.
    hasPartner();
    hasChildren();
}

// Event handler for toggle of has partner checkbox.
// If checked, creates new form elements. If unchecked will remove those form elements.
function hasPartner() {
    $("#hasPartner").change(function() {
        if(this.checked) {
                $("#partnerContainer").append("<div id=partnerDetails></div>");
                $("#partnerDetails").append("<fieldset id=partnerFieldset><legend>Partner's Details</legend></fieldset>");

                createErrorLbl("#partnerFieldset", "partnerFName");
                createInput("#partnerFieldset", "partnerFName", "First Name:", "text", "partnerFName");

                createErrorLbl("#partnerFieldset", "partnerMName");
                createInput("#partnerFieldset", "partnerMName", "Middle Name (Optional):", "text", "partnerMName");

                createErrorLbl("#partnerFieldset", "partnerSurname");
                createInput("#partnerFieldset", "partnerSurname", "Surname:", "text", "partnerSurname");

                createErrorLbl("#partnerFieldset", "partnerGender");
                $("#partnerFieldset").append("<label>Gender:<select id=partnerGender><option value=''></option><option value=PMale>Male</option><option value=PFemale>Female</option><option value=POther>Other</option></select></label>");

                createErrorLbl("#partnerFieldset", "partnerBDay");
                createInput("#partnerFieldset", "partnerBDay", "Birthday:", "date", "partnerBDay");

                createErrorLbl("#partnerFieldset", "partnerAge");
                createInput("#partnerFieldset", "partnerAge", "Age:", "number", "partnerAge");

                createErrorLbl("#partnerFieldset", "partnerOccupation");
                createInput("#partnerFieldset", "partnerOccupation", "Occupation:", "text", "partnerOccupation");

                // Validates birthday year.
                $(form).on("input change blur", "#partnerBDay", function () {
                    bdayDateValidation();
                });
        } else {
            $("#partnerDetails").remove();
        }
    });
}

// Event handler for toggle of has children checkbox.
// If checked, creates new form elements. If unchecked will remove those form elements.
function hasChildren() {
    $("#hasChildren").change(function() {
        if(this.checked) {
                $("#childrenContainer").append("<div id=childrenDetails></div>");
                $("#childrenDetails").append("<fieldset id=childrenFieldset><legend>Children's Details</legend></fieldset>");

                createErrorLbl("#childrenFieldset", "numOfChildren");
                $("#childrenFieldset").append("<label id=childNum>How many children?:<select id=numOfChildren><option value=''></option><option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option><option value=7>7</option><option value=8>8</option></select></label>");

                numOfChildren();
        } else {
            $("#childrenDetails").remove();
        }
    });
}

// Creates the required number of form elements for each child according to the number of children entered by the user.
function numOfChildren() {
    var container = $("#childrenFieldset");
    // Checks value of select drop down box.
    var number = container.find("select").val();

    // On change event handler.
    $("#childNum").change(function() {
        // Checks updated number of select drop down box and removes any prvious sub container used to hold children form elements.
        number = container.find("select").val();
        $("#childrenSubContainer").remove();

        // Adds a refreshed version of the sub container ready for new population according to the new number of children chosen by the user.
        container.append("<div id=childrenSubContainer></div>");

        // Populates children form elements inside the sub container.
        for(i = 0; i < number; i++) {
            $("#childrenSubContainer").append("<fieldset id=childSection" + i + "><legend>Child " + (i +1) + " Details</legend></fieldset>");

            createInput("#childSection" + i, "childFName" + i, "First Name", "text", "childFName" + i);

            createInput("#childSection" + i, "childMName" + i, "Middle Name (Optional):", "text", "childMName" + i);

            createInput("#childSection" + i, "childSurname" + i, "Surname:", "text", "childSurname" + i);

            $("#childSection" + i).append("<label>Gender:<select id=childGender" + i +"><option value=''></option><option value=CMale" + i + ">Male</option><option value=CFemale" + i + ">Female</option><option value=COther" + i + ">Other</option></select></label>");

            $("#childSection" + i).append("<label for=childBDay" + i + " class=hide></label>"); // For the error text
            createInput("#childSection" + i, "childBDay" + i, "Birthday:", "date", "childBDay" + i);

            createInput("#childSection" + i, "childAge" + i, "Age:", "number", "childAge" + i);

            // Validates birthday year.
            $(form).on("input change blur", "#childBDay" + i, function () {
                bdayDateValidation();
            });
        }
    });
}

//---------------
// Section 2
//---------------
// Populates section two of the form on click of the continue button if the page is valid.
// Also hides help button content if it is being displayed.
form.on("click", "#continueBtn1", function () {
    var content = $("#helpBtnContent");
    content.addClass("hide");
    
    validate();

    if(!sectionError()) {
        return false;
    }

    populateSectionTwo();
    wireUpContinueBtn(2);
});

// Functionality for the section two back button. Returns to the previous section of the form, hiding and repopulating elements as necessary if the page is valid.
// Also hides help button content if it is being displayed.
form.on("click", "#backBtn2", function () {
    var content = $("#helpBtnContent2");
    content.addClass("hide");

    validate();

    if(!sectionError()) {
        return false;
    }

    wireUpBackBtn(2);
});

// Shows and hides the help button content on click for section two.
form.on("click", "#helpButton2", function () {
    var content = $("#helpBtnContent2");
    if(content.attr("class") == "helpBtnDisplay hide"){
        content.removeClass("hide")
    } else {
        content.addClass("hide");
    }
});

// Function for populating section two of the form. If section two does not exist (checked via the .length method) it will create it. If it does exist and it is hidden, from clicking the back button at some point, it will change the display to show.
function populateSectionTwo() {
    $("#questionaire1").addClass("hide");

    if(!$("#questionaire2").length) {
        $("#helpButton1").remove();
        createBtn("#helpBtnContainer", "button", "helpButton2", "Help?");
        $("#helpButton2").addClass("helpButton");
        $("#questionaire1").after("<div id=questionaire2></div>");
        $("#questionaire2").addClass("questionaire");
        $("#questionaire2").append("<h3>Contact</h3>");
        $("#questionaire2").append("<fieldset id=contactDetails><legend>Contact Details</legend></fieldset>");

        createErrorLbl("#contactDetails", "streetNum");
        createInput("#contactDetails", "streetNum", "Street Number:", "number", "streetNum");

        createErrorLbl("#contactDetails", "streetName");
        createInput("#contactDetails", "streetName", "Street Name:", "text", "streetName");

        createErrorLbl("#contactDetails", "streetType");
        createInput("#contactDetails", "streetType", "Street Type:", "text", "streetType");

        createErrorLbl("#contactDetails", "suburb");
        createInput("#contactDetails", "suburb", "Suburb (Optional):", "text", "suburb");

        createErrorLbl("#contactDetails", "city");
        createInput("#contactDetails", "city", "City/Town:", "text", "city");

        createErrorLbl("#contactDetails", "state");
        $("#contactDetails").append("<label>State:<select id=state><option value=''></option><option value=QLD>QLD</option><option value=NSW>NSW</option><option value=VIC>VIC</option><option value=TAS>TAS</option><option value=WA>WA</option><option value=ACT>ACT</option><option value=NT>NT</option><option value=SA>SA</option><option value=International>International</option></select></label>");

        createErrorLbl("#contactDetails", "postCode");
        createInput("#contactDetails", "postCode", "Post Code:", "number", "postCode");

        createErrorLbl("#contactDetails", "country");
        createInput("#contactDetails", "country", "Country:", "text", "country");

        createErrorLbl("#contactDetails", "email");
        $("#contactDetails").append("<label>Email:<input id=email type=Email name=email></label>");

        createErrorLbl("#contactDetails", "phone");
        $("#contactDetails").append("<label>Phone:<input id=phone type=tel name=email></label>");
    } else {
        $("#questionaire2").removeClass("hide");
    }
}


//---------------
// Section 3
//---------------
// Populates section three of the form on click of the continue button if the page is valid.
// Also hides the help button content if it is being displayed.
form.on("click", "#continueBtn2", function () {
    var content = $("#helpBtnContent2");
    content.addClass("hide");

    validate();

    if(!sectionError()) {
        return false;
    }

    populateSectionThree();
    wireUpContinueBtn(3);
});

// Functionality for the section three back button. Returns to the previous section of the form, hiding and repopulating elements as necessary if the page is valid.
// Also hides the help button content if it is being displayed.
form.on("click", "#backBtn3", function () {
    var content = $("#helpBtnContent3");
    content.addClass("hide");

    validate();
    if(!sectionError()) {
        return false;
    }

    wireUpBackBtn(3);
});

// Functionality for populating sub regions when the user makes a selection from the preffered destion region drop down list.
form.on("change", "#prefRegion", function () {
    $("#subRegionContainer").remove();
    populateSubRegions();
});

// Functionality for populating sub accomodation options when the user makes a selection from the preffered accomodation type drop down list.
form.on("change", "#prefAccomodation", function () {
    $("#subAccomodationContainer").remove();
    populateSubAccomodation();
});

// Shows or hides the help buton content for section 3 on click.
form.on("click", "#helpButton3", function () {
    var content = $("#helpBtnContent3");
    if(content.attr("class") == "helpBtnDisplay hide"){
        content.removeClass("hide")
    } else {
        content.addClass("hide");
    }
});

// Function for populating section three of the form. If section three does not exist (checked via the .length method) it will create it. If it does exist and it is hidden, from clicking the back button at some point, it will change the display to show.
function populateSectionThree() {
    $("#questionaire2").addClass("hide");

    if(!$("#questionaire3").length) {
        $("#helpButton2").remove();
        createBtn("#helpBtnContainer", "button", "helpButton3", "Help?");
        $("#helpButton3").addClass("helpButton");
        $("#questionaire2").after("<div id=questionaire3></div>");
        $("#questionaire3").addClass("questionaire");
        $("#questionaire3").append("<h3>Destination</h3>");
        $("#questionaire3").append("<fieldset id=destPrefs><legend>Destination Preferences</legend></fieldset>");

        createErrorLbl("#destPrefs", "environment");
        $("#destPrefs").append("<label>Preferred destination environment?<input id=environment type=text name=environment list=enviroList><datalist id=enviroList><option value=Rainforest><option value=Desert><option value=Ocean><option value=City><option value=Country><option value=Mountains><option value=Tropical><option value=Snow><option value=Coastal></datalist>");

        $("#destPrefs").append("<fieldset id=regionFieldSet><legend>Region</legend></fieldset>");

        createErrorLbl("#regionFieldSet", "prefRegion");
        $("#regionFieldSet").append("<label>Preferred destination region?<select id=prefRegion><option value=''></option><option value=Oceania>Oceania</option><option value=Asia>Asia</option><option value=NAmerica>North America</option><option value=SAmerica>South America</option><option value=CAmerica>Central America</option><option value=Europe>Europe</option><option value=EU>European Union</option><option value=Caribbean>Caribbean</option><option value=MEast>Middle East</option><option value=Africa>Africa</option></select></label>");

        $("#destPrefs").append("<fieldset id=accommodationFieldSet><legend>Accommodation</legend></fieldset>");

        createErrorLbl("#accommodationFieldSet", "prefAccomodation");
        $("#accommodationFieldSet").append("<label>Preferred type of accommodation?<select id=prefAccomodation><option value=''></option><option value=Hotel>Hotel</option><option value=Resort>Resort</option><option value=Motel>Motel</option><option value=BedBreakfast>Bed and Breakfast</option><option value=BackpackerAccommodation>Backpacker's Accommodation</option><option value=Glamping>Glamping</option><option value=Camping>Camping</option><option value=HealthRetreat>Health Retreat</option><option value=Other>Other</option></select></label>");

        createErrorLbl("#destPrefs", "howActive");
        $("#destPrefs").append("<label>How active do you want to be on your trip?<select id=howActive><option value=''></option><option value=AlwaysTravelling>See everything there is to see</option><option value=Relax>Just want to relax</option><option value=Adventure>Bring on the adventure</option><option value=bitOfEverything>Bit of everything</option></select></label>");

        // CSS classes being added to elements.
        $("#destPrefs").find("input").addClass("blockDisplay");
        $("#destPrefs").find("select").addClass("blockDisplay");
        $("#destPrefs").find("label").addClass("inlineDisplay");
    } else {
        $("#questionaire3").removeClass("hide");
    }
}

// Logic for adding in new drop down lists populated with required sub regions, according to the users selection of the preffered destination drop down list.
function populateSubRegions() {
    $("#regionFieldSet").append("<div id=subRegionContainer></div>");

    switch ($("#prefRegion").val()) {
        case "Oceania":
            createErrorLbl("#subRegionContainer", "oceania");
            $("#subRegionContainer").append("<label>Which sub region?<select id=oceania><option value=''></option><option value=Australia>Australia</option><option value=NewZealand>New Zealand</option><option value=PapuaNewGuinea>Papua New Guinea</option><option value=Samoa>Samoa</option><option value=Micronesia>Micronesia</option></select></label>");
            break;
        case "Asia":
            createErrorLbl("#subRegionContainer", "asia");
            $("#subRegionContainer").append("<label>Which sub region?<select id=asia><option value=''></option><option value=Japan>Japan</option><option value=India>India</option><option value=China>China</option><option value=SouthKorea>South Korea</option><option value=Malaysia>Malaysia</option><option value=Nepal>Nepal</option></select></label>");
            break;
        case "Europe":
            createErrorLbl("#subRegionContainer", "europe");
            $("#subRegionContainer").append("<label>Which sub region?<select id=europe><option value=''></option><option value=UnitedKingdom>United Kingdom</option><option value=Switzerland>Switzerland</option><option value=Russia>Russia</option><option value=Norway>Norway</option><option value=Iceland>Iceland</option><option value=Belarus>Belarus</option></select></label>");
            break;
        case "EU":
            createErrorLbl("#subRegionContainer", "eu");
            $("#subRegionContainer").append("<label>Which sub region?<select id=eu><option value=''></option><option value=Ireland>Ireland</option><option value=Sweden>Sweden</option><option value=Spain>Spain</option><option value=Germany>Germany</option><option value=France>France</option><option value=Belgium>Belgium</option></select></label>");
            break;
        case "Caribbean":
            createErrorLbl("#subRegionContainer", "caribbean");
            $("#subRegionContainer").append("<label>Which sub region?<select id=caribbean><option value=''></option><option value=Cuba>Cuba</option><option value=Barbados>Barbados</option><option value=Jamaica>Jamaica</option><option value=Curacao>Curacao</option><option value=Bermuda>Bermuda</option></select></label>");
            break;
        case "MEast":
            createErrorLbl("#subRegionContainer", "mEast");
            $("#subRegionContainer").append("<label>Which sub region?<select id=mEast><option value=''></option><option value=Iraq>Iraq</option><option value=Iran>Iran</option><option value=Afghanistan>Afghanistan</option><option value=Israel>Israel</option><option value=Syria>Syria</option><option value=Yemen>Yemen</option><option value=Bahrain>Bahrain</option><option value=Egypt>Egypt</option></select></label>");
            break;
        case "Africa":
            createErrorLbl("#subRegionContainer", "africa");
            $("#subRegionContainer").append("<label>Which sub region?<select id=africa><option value=''></option><option value=SouthAfrica>South Africa</option><option value=NorthAfrica>North Africa</option><option value=EastAfrica>East Africa</option><option value=MiddleAfrica>Middle Africa</option><option value=WestAfrica>West Africa</option><option value=Yemen>Yemen</option><option value=Bahrain>Bahrain</option></select></label>");
            break;
        case "CAmerica":
            createErrorLbl("#subRegionContainer", "cAmerica");
            $("#subRegionContainer").append("<label>Which sub region?<select id=cAmerica><option value=''></option><option value=Mexico>Mexico</option><option value=Panama>Panama</option><option value=Honduras>Honduras</option></select></label>");
            break;
        case "SAmerica":
            createErrorLbl("#subRegionContainer", "sAmerica");
            $("#subRegionContainer").append("<label>Which sub region?<select id=sAmerica><option value=''></option><option value=Peru>Peru</option><option value=Columbia>Columbia</option><option value=Venezuala>Venezuala</option><option value=Bolivia>Bolivia</option></select></label>");
            break;
        case "NAmerica":
            createErrorLbl("#subRegionContainer", "nAmerica");
            $("#subRegionContainer").append("<label>Which sub region?<select id=nAmerica><option value=''></option><option value=USA>USA</option><option value=Canada>Canada</option><option value=Greenland>Greenland</option></select></label>");
            break;
    }

    // Applies CSS classes to style dynamically created elements.
    $("#destPrefs").find("select").addClass("blockDisplay");
    $("#destPrefs").find("label").addClass("inlineDisplay");
    // Validates page on creation of container to avoid any display errors regarding text.
    validate();
}

// Logic for adding in new drop down lists populated with required sub accommodation options, according to the users selection of the preffered accomodation type drop down list.
function populateSubAccomodation() {
    $("#accommodationFieldSet").append("<div id=subAccomodationContainer></div>");

    switch ($("#prefAccomodation").val()) {
        case "Hotel":
            createErrorLbl("#subAccomodationContainer", "hotel");
            $("#subAccomodationContainer").append("<label>What level of luxury?<select id=hotel><option value=''></option><option value=FiveStar>5 star</option><option value=FourStar>4 star</option><option value=ThreeStar>3 star</option><option value=Penthouse>Penthouse</option><option value=SharedRoom>Shared Room</option></select></label>");
            break;
        case "Motel":
            createErrorLbl("#subAccomodationContainer", "motel");
            $("#subAccomodationContainer").append("<label>What level of luxury?<select id=motel><option value=''></option><option value=FourStar>4 star</option><option value=ThreeStar>3 star</option><option value=SharedRoom>Shared Room</option></select></label>");
            break;
        case "BedBreakfast":
            createErrorLbl("#subAccomodationContainer", "bnb");
            $("#subAccomodationContainer").append("<label>What type of facilities??<select id=bnb><option value=''></option><option value=Ensuite>Ensuite</option><option value=sharedBathroom>Shared Bathroom</option><option value=SharedRoom>Shared Room</option></select></label>");
            break;
        case "HealthRetreat":
            createErrorLbl("#subAccomodationContainer", "retreat");
            $("#subAccomodationContainer").append("<label>What level of luxury?<select id=retreat><option value=''></option><option value=FiveStar>5 star</option><option value=FourStar>4 star</option><option value=ThreeStar>3 star</option><option value=Villa>Villa</option><option value=SharedRoom>Shared Room</option></select></label>");
            break;
        case "Resort":
            createErrorLbl("#subAccomodationContainer", "resort");
            $("#subAccomodationContainer").append("<label>What level of luxury?<select id=resort><option value=''></option><option value=FiveStar>5 star</option><option value=FourStar>4 star</option><option value=ThreeStar>3 star</option><option value=Villa>Villa</option><option value=SharedRoom>Shared Room</option></select></label>");
            break;
        case "Other":
            createErrorLbl("#subAccomodationContainer", "other");
            $("#subAccomodationContainer").append("<label>Please specify:<textarea id=other name=otherAccomodationType rows=5 cols=50></textarea></label>");
            break;
    }
    // Applies CSS classes to style dynamically created elements.
    $("#destPrefs").find("select").addClass("blockDisplay");
    $("#destPrefs").find("textarea").addClass("blockDisplay");
    $("#destPrefs").find("label").addClass("inlineDisplay");
    // Validates page on creation of container to avoid any display errors regarding text.
    validate();
}

//---------------
// Section 4
//---------------
// Populates section four of the form on click of the continue button if the page is valid.
// Also hides the help button content if it is being displayed.
form.on("click", "#continueBtn3", function () {
    var content = $("#helpBtnContent3");
    content.addClass("hide");

    validate();

    if(!sectionError()) {
        return false;
    }

    wireUpContinueBtn(4);
    populateSectionFour();
});

// Functionality for the section four back button. Returns to the previous section of the form, hiding and repopulating elements as necessary if the page is valid.
// Also hides the help button content if it is being displayed.
form.on("click", "#backBtn4", function () {
    var content = $("#helpBtnContent4");
    content.addClass("hide");

    validate();

    if(!sectionError()) {
        return false;
    }

    wireUpBackBtn(4);
});

// Changes the submit button, which has the id of continueBtn4 for form navigation functionality, to be of type submit on click.
// This submits all form data on button click.
// Also hides help button content if it is being displayed.
form.on("click", "#continueBtn4", function () {
    var content = $("#helpBtnContent4");
    content.addClass("hide");

    validate();

    if(!sectionError()) {
        preventDefault();
        return false;
    }

    $("#continueBtn4").attr("type", "submit");
});

// Update the display of the monetry value associated with the budget slider.
$(form).on("input change", "#budgetValue", function () {
$("#budget").text("Maximum travel budget: $" + $("#budgetValue").val());
});

// Functionality for populating sub travel mode options when the user makes a selection from the preffered travel type drop down list.
form.on("change", "#prefTravelMode", function () {
    $("#subTravelModeContainer").remove();
    populateTravelMode();
})

// Validates travel date.
$(form).on("input change blur", "#startDate", function () {
    travelDateValidation();
});

// Validates travel date.
$(form).on("input change blur", "#endDate", function () {
    travelDateValidation();
});

// Shows or hides the help button content for section 4 on click.
form.on("click", "#helpButton4", function () {
    var content = $("#helpBtnContent4");
    if(content.attr("class") == "helpBtnDisplay hide"){
        content.removeClass("hide")
    } else {
        content.addClass("hide");
    }
});

// Function for populating section four of the form. If section four does not exist (checked via the .length method) it will create it. If it does exist and it is hidden, from clicking the back button at some point, it will change the display to show.
function populateSectionFour() {
    $("#questionaire3").addClass("hide");

    if(!$("#questionaire4").length) {
        $("#helpButton3").remove();
        $("#helpButton4").addClass("helpButton");
        $("#questionaire3").after("<div id=questionaire4></div>");
        $("#questionaire4").addClass("questionaire");
        $("#questionaire4").append("<h3>Travel</h3>");
        $("#questionaire4").append("<fieldset id=travelSpecs><legend>Travel Specifics</legend></fieldset>");

        $("#travelSpecs").append("<fieldset id=travelModeFieldSet><legend>Mode of travel</legend></fieldset>");

        createErrorLbl("#travelModeFieldSet", "prefTravelMode");
        $("#travelModeFieldSet").append("<label>Preferred mode of travel<select id=prefTravelMode><option value=''></option><option value=Air>Air</option><option value=Road>Road</option><option value=Water>Water</option><option value=Bicycle>Bicycle</option><option value=Walking>Walking</option><option value=Train>Train</option><option value=Horse>Horse</option></select></label>");

        createErrorLbl("#travelSpecs", "budgetValue");
        $("#travelSpecs").append("<label id=budget>Maximum travel budget: $0</label>");
        $("#travelSpecs").append("<input id=budgetValue type=range value=0 min=0 max=50000 step=100>");

        createErrorLbl("#travelSpecs", "startDate");
        createInput("#travelSpecs", "startDate", "Preferred travel date start:", "date", "travelDateStart");

        createErrorLbl("#travelSpecs", "endDate");
        createInput("#travelSpecs", "endDate", "Preferred travel date finish:", "date", "travelDateEnd");

        $("#travelSpecs").append("<label id=travellingCompanionsError class=hide>Required Field</label>"); // Error label.
        $("#travelSpecs").append("<label id=travellingCompanions>How many people are you going to be traveling with?</label><br><br>");
        $("#travelSpecs").append("<input id=numOfPeople1 type=radio name=numOfPeople value=JustMe>");
        $("#travelSpecs").append("<label id=numOfPeople1Lbl for=numOfPeople1>Just Me</label><br><br>");
        $("#travelSpecs").append("<input id=numOfPeople2 type=radio name=numOfPeople value=1>");
        $("#travelSpecs").append("<label id=numOfPeople2Lbl for=numOfPeople2>1</label><br><br>");
        $("#travelSpecs").append("<input id=numOfPeople3 type=radio name=numOfPeople value=2>");
        $("#travelSpecs").append("<label id=numOfPeople3Lbl for=numOfPeople3>2</label><br><br>");
        $("#travelSpecs").append("<input id=numOfPeople4 type=radio name=numOfPeople value=ThreePlus>");
        $("#travelSpecs").append("<label id=numOfPeople4Lbl for=numOfPeople4>3+</label><br><br><br>");
        $("#travelSpecs").append("<label>Further details you'd like to add (Optional):<textarea id=furtherDetails name=furtherDetails rows=5 cols=50></textarea></label>");

        // CSS classes being added to elements.
        $("#travelSpecs").find("input").addClass("blockDisplay");
        $("#travelSpecs").find("select").addClass("blockDisplay");
        $("#travelSpecs").find("textarea").addClass("blockDisplay");
        $("#travelSpecs").find("label").addClass("inlineDisplay");

        $("#travellingCompanions").removeClass("inlineDisplay");
        $("#travellingCompanions").addClass("blockDisplay");
        $("#travellingCompanions").addClass("radioHeaderLbl");

        $("#numOfPeople1").addClass("radioInput");
        $("#numOfPeople1").removeClass("blockDisplay");
        $("#numOfPeople2").addClass("radioInput");
        $("#numOfPeople2").removeClass("blockDisplay");
        $("#numOfPeople3").addClass("radioInput");
        $("#numOfPeople3").removeClass("blockDisplay");
        $("#numOfPeople4").addClass("radioInput");
        $("#numOfPeople4").removeClass("blockDisplay");

        $("#numOfPeople1Lbl").addClass("radioInput")
        $("#numOfPeople1Lbl").removeClass("inlineDisplay");
        $("#numOfPeople2Lbl").addClass("radioInput")
        $("#numOfPeople2Lbl").removeClass("inlineDisplay");
        $("#numOfPeople3Lbl").addClass("radioInput")
        $("#numOfPeople3Lbl").removeClass("inlineDisplay");
        $("#numOfPeople4Lbl").addClass("radioInput")
        $("#numOfPeople4Lbl").removeClass("inlineDisplay");
    } else {
        $("#questionaire4").removeClass("hide");
    }
}

// Logic for adding in new drop down lists populated with required sub travel mode options, according to the users selection of the preffered travel type drop down list.
function populateTravelMode() {
    $("#travelModeFieldSet").append("<div id=subTravelModeContainer></div>");

    switch ($("#prefTravelMode").val()) {
        case "Air":
            createErrorLbl("#subTravelModeContainer", "airTravel");
            $("#subTravelModeContainer").append("<label>What type of air travel?<select id=airTravel><option value=''></option><option value=JumboJet>Jumbo Jet</option><option value=LightPlane>Light Plane</option><option value=Helicopter>Helicopter</option></select></label>");
            break;
        case "Road":
            createErrorLbl("#subTravelModeContainer", "roadTravel");
            $("#subTravelModeContainer").append("<label>What type of road travel?<select id=roadTravel><option value=''></option><option value=Car>Car</option><option value=Bus>Bus</option><option value=MotorBike>MotorBike</option></select></label>");
            break;
        case "Water":
            createErrorLbl("#subTravelModeContainer", "waterTravel");
            $("#subTravelModeContainer").append("<label>What type of water travel?<select id=waterTravel><option value=''></option><option value=OceanLiner>Ocean Liner</option><option value=Yacht>Yacht</option><option value=Barge>Barge</option><option value=SpeedBoat>Speed Boat</option><option value=Catamaran>Catamaran</option></select></label>");
            break;
        case "Other":
            createErrorLbl("#subTravelModeContainer", "otherTravel");
            $("#subTravelModeContainer").append("<label>Please specify:<textarea id=otherTravel rows=5 cols=50></textarea></label>");
            break;
    }
    // Applies CSS classes to style dynamically created elements.
    $("#travelSpecs").find("select").addClass("blockDisplay");
    $("#travelSpecs").find("textarea").addClass("blockDisplay");
    $("#travelSpecs").find("label").addClass("inlineDisplay");
    // Validates page on creation of container to avoid any display errors regarding text.
    validate();
}

//---------------
// Global Functions
//---------------
// Creates a new button element nested under the specified parent element, with the id and text as given by parameters.
function createBtn(parentElement, type, id, text) {
    $(parentElement).append("<input id=" + id + " type=" + type + " value=" + text + ">");
}

// Creates a new input form element nested under the specified parent element, with the text, type and name as given by parameters.
function createInput(parentElement, id, text, type, name) {
    $(parentElement).append("<label>" + text + "<input id=" + id + " type=" + type + " name=" + name + ">" + "</label>");
}

// Creates an error label that is associated with the input element specified by the passed in forId parameter.
function createErrorLbl(parentElement, forId) {
    $(parentElement).append("<label for=" + forId + " class=hide></label>");
}

// Adds logic to the back button of each form section according to the section number parameter passed in.
function wireUpBackBtn(sectionNum) {
    $("#questionaire" + sectionNum).addClass("hide");
    $("#questionaire" + (sectionNum - 1)).removeClass("hide");
    $("#helpButton" + sectionNum).attr("id", "helpButton" + (sectionNum - 1));
    
    // If clicking the back button from section two of the form, will remove the back button as section one does not have a back button.
    // Otherwise if clicking the back button from other sections of the form will decrement the id of the back button.
    if(sectionNum == 2) {
        $("#bottomBtnContainer").find("#backBtn" + sectionNum).remove();
    } else {
        $("#backBtn" + sectionNum).attr("id", "backBtn" + (sectionNum - 1));
    }

    $("#continueBtn" + sectionNum).attr("id", "continueBtn" + (sectionNum - 1));
    $("#continueBtn" + (sectionNum - 1)).attr("value","Continue");
    $("#bottomBtnContainer").find("p").remove();
    $("#bottomBtnContainer").find("progress").remove();
    $("#bottomBtnContainer").append("<p>" + (((sectionNum - 1) / 4) * 100) + "% Complete</p>");
    $("#bottomBtnContainer").append("<progress value=" + (sectionNum - 1 ) + " max=4></progress>");
}

// Adds logic to the continue button of each form section according to the section number parameter passed in.
function wireUpContinueBtn(sectionNum) {
    $("#bottomBtnContainer").find("p").remove();
    $("#bottomBtnContainer").find("progress").remove();
    $("#helpButton" + (sectionNum - 1)).attr("id", "helpButton" + sectionNum);

    // Creates a back button if proceeding to section two of the form.
    if(sectionNum == 2) {
        $("#bottomBtnContainer").prepend("<button id=backBtn" + sectionNum + " type=button>Back</button>");
        $("#backBtn" + sectionNum).addClass("btn");
        $("#backBtn" + sectionNum).addClass("backBtn");
    }

    // If not proceeding to section two of the form, will just increment the id of the already present back button.
    $("#backBtn" + (sectionNum - 1)).attr("id", "backBtn" + sectionNum);

    // If not in section four of the form (final section), increment the id of the continue button, and ensure the text says continue.
    // Otherwise if in the final section of the form, change text of the button to submit.
    if (sectionNum != 4) {
        $("#continueBtn" + (sectionNum - 1)).attr("id", "continueBtn" + sectionNum);
        $("#continueBtn" + sectionNum).text("Continue");
    } else {
        $("#continueBtn" + (sectionNum - 1)).attr("id", "continueBtn" + sectionNum);
       $("#continueBtn" + sectionNum).attr("value", "Submit");
    }

    $("#bottomBtnContainer").append("<p>" + ((sectionNum / 4) * 100) + "% Complete</p>");
    $("#bottomBtnContainer").append("<progress value=" + sectionNum + " max=4></progress>");
}

//---------------
// Validation Functions
//---------------
// Provides functionality for form element validation.
function validate() {
    
    // Personal fileds of section one.
    if(!validateField("fName") || !validateField("mName") || !validateField("surname") || !validateField("gender") 
        || !validateField("bDay") || !validateField("age") || !validateField("occupation") || !validateField("interests")) {
        return;
    }

    // Partner fields of section one.
    if($("#hasPartner").is(":checked")) {
        if(!validateField("partnerFName") || !validateField("partnerMName") || !validateField("partnerSurname") || !validateField("partnerGender")
            || !validateField("partnerBDay") || !validateField("partnerAge") || !validateField("partnerOccupation")) {
            return;
        }
    }

    // Children fields of section one.
    if($("#hasChildren").is(":checked")) {
        if(!validateField("numOfChildren")) {
            return;
        }
    }

    // Contact fields of section two.
    // Only validates if section exists.
    if($("#questionaire2").length) {
        if(!validateField("streetNum") || !validateField("streetName") || !validateField("streetType") || !validateField("suburb") 
            || !validateField("city") || !validateField("state") || !validateField("postCode") || !validateField("country") 
            || !validateField("email") || !validateField("phone")) {
            return;
        }
    }

    // Destination fields of section three.
    // Only validates if section exists.
    if($("#questionaire3").length) {
            if(!validateField("environment") || !validateField("prefRegion") || !validateField("prefAccomodation") || !validateField("howActive")) {
                return;
            }
    }

    // Travel specifics fields of section four.
    // Only validates if section exists.
    if($("#questionaire4").length) {
            if(!validateField("prefTravelMode") || !validateField("budgetValue") || !validateField("startDate") || !validateField("endDate")) {
                return;
            }

            // Validation for radio buttons.
            if(!$("#numOfPeople1").is(":checked") && !$("#numOfPeople2").is(":checked") && !$("#numOfPeople3").is(":checked") 
                && !$("#numOfPeople4").is(":checked")) {
                pageValid = false;
                $("#travellingCompanionsError").removeClass("hide");
                $("#travellingCompanionsError").addClass("notValidText");
                return;
            } else {
                pageValid = true;
                $("#travellingCompanionsError").addClass("hide");
                $("#travellingCompanionsError").removeClass("notValidText");
                $("#travellingCompanionsError").removeClass("inlineDisplay");
            }
    }
}

// Validates a single field that is passed in as an objectId parameter.
function validateField(objectId) {
    // Regular Exprssions
    var textRegex = /^[a-zA-Z\s]*$/;
    var partnerMNameRegex = /^partnerMName/;
    var childMNameRegex = /^childMName/;
    var childGenderRegex = /^childGender/;
    var emailRegex = /\S+@\S+\.\S+/;
    var numberRegex = /^[0-9]*$/;

    // Variables relating to object being passed into function.
    var value = $("#" + objectId).val();
    var id = $("#" + objectId).attr("id");
    var object = $("#" + objectId);

    if(value == "" && id != "mName" && !partnerMNameRegex.test(id) && !childMNameRegex.test(id) && id != "suburb") { // If value of input is blank, or one of the optional fields.
        pageValid = false;
        object.addClass("notValid");
        errorDisplayShow(id, "required");
        return false;
    } else if(!textRegex.test(value) && object.attr("type") != "number" && object.attr("type") != "date" 
    && object.attr("type") != "Email" && object.attr("type") != "tel" && object.attr("type") != "range" && object.attr("id") != "numOfChildren" 
    && !childGenderRegex.test(id)) { // If value does not match regular expression, or other tests relating to type of input.
        pageValid = false;
        object.addClass("notValid");
        errorDisplayShow(id, "text");
        return false;
    } else if(!emailRegex.test(value) && id == "email") {
        pageValid = false;
        object.addClass("notValid");
        errorDisplayShow(id, "email");
        return false;
    } else if(!numberRegex.test(value) && id == "phone") {
        pageValid = false;
        object.addClass("notValid");
        errorDisplayShow(id, "phone");
        return false;
    } else if(value == null || (value == 0 && id == "budgetValue")) { // If value of input is null or 0. For multi select lists and range input.
        pageValid = false;
        object.addClass("notValid");
        errorDisplayShow(id, "required");
        return false;
    } else { // If input is valid.
        pageValid = true;
        object.removeClass("notValid");
        errorDisplayHide(id);
        return true;
    }
}

// Validation for birthday date boxes.
// Checks user input year against current year, if input year is greater than current year, display an error message.
function bdayDateValidation() {
    var blankSpace = /^\s*$/;

    $("input[type='date']").each(function() {
        var id = $(this).attr("id");
        var date = $("#" + id).val().split("-"); // Stores date components in an array.
        var year = date[0];
        var currentYear = (new Date).getFullYear();
        if((year > currentYear || year < 1850) && !blankSpace.test(year)) {
            $(this).addClass("notValid");
            errorDisplayShow(id, "bDay");
            pageValid = false;
        } else {
            $(this).removeClass("notValid");
            errorDisplayHide(id);
            pageValid = true;
        }
    });
}

// Validation for travel date boxes.
// Checks input year, month and day. If the year is less than current, display an error message. If the input year matches the current year, but the month is less than the current month, display an error message. If both the input year and month match the current year and month, but the day is less than the current day, display an error message.
function travelDateValidation() {
    var blankSpace = /^\s*$/;

    $("input[type='date']").each(function() {
        var id = $(this).attr("id");
        var date = $("#" + id).val().split("-"); // Stores date components in an array.
        var year = date[0];
        var month = date[1];
        var day = date[2];
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth() + 1;
        var currentDay = currentDate.getDay() + 1;
        if(((year < currentYear || (year == currentYear && month < currentMonth) || (year == currentYear && month == currentMonth && day < currentDay)) && !blankSpace.test(year))) {
            $(this).addClass("notValid");
            errorDisplayShow(id, "travelDate");
            pageValid = false;
        } else {
            $(this).removeClass("notValid");
            errorDisplayHide(id);
            pageValid = true;
        }
    });
}

// Shows the error label associated with the input element specified by the passed in id parameter.
function errorDisplayShow(id, type) {
    $("label").each(function () {
        // Below "this" refers to the label.
        if($(this).attr("for") == id) {
            if(type == "text") {
                $(this).text("Only letters accepted.");
            } else if(type == "bDay") {
                $(this).text("Invalid birthday year.");
            } else if(type == "travelDate") {
                $(this).text("Travel date cannot be before current date.");
            } else if(type == "required") {
                $(this).text("Required Field");
            } else if(type == "email") {
                $(this).text("Does not match accepted format of: name@domain.xyz");
            } else if(type == "phone") {
                $(this).text("Only numbers permitted. No spaces.");
            } else if(type == "dateDay") {
                $(this).text("This month does not have 31 days.");
            }
            $(this).removeClass("hide");
            $(this).addClass("notValidText");
        }
    });
}

// Hides the error label associated with the input element specified by the passed in id parameter.
function errorDisplayHide(id) {
    $("label").each(function () {
    // Below "this" refers to the label.
        if($(this).attr("for") == id) {
            $(this).removeClass("notValidText");
            $(this).removeClass("inlineDisplay");
            $(this).addClass("hide");
        }
    });
}

// Functionality to prevent the user from proceeding to other sections of the form if the page is in an invalid state due to form elements not validating.
function sectionError() {
    if(!pageValid) {
        $("#sectionError").removeClass("hide");
        $("#sectionError").addClass("pageNotValid");
        return false;
    } else {
        $("#sectionError").addClass("hide");
        $("#sectionError").removeClass("pageNotValid");
        return true;
    }
}