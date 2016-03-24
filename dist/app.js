angular.module('templates-dist', ['../app/partials/card-detail.html', '../app/partials/card-game.html', '../app/partials/card-list.html', '../app/partials/flashcard.html']);

angular.module("../app/partials/card-detail.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/card-detail.html",
    "<div class=\"card-images\">\n" +
    "  <img ng-src=\"{{img}}\"\n" +
    "       class=\"card\"\n" +
    "       ng-repeat=\"img in card.images\"\n" +
    "       ng-class=\"{active: mainImageUrl==img}\">\n" +
    "</div>\n" +
    "\n" +
    "<h1>{{card.name}}</h1>\n" +
    "\n" +
    "<ul class=\"specs\">\n" +
    "  <li>\n" +
    "    <span>Regiochemistry</span>\n" +
    "    <dl>\n" +
    "      <dd>{{card.regiochemistry}}</dd>\n" +
    "    </dl>\n" +
    "    <span>Stereochemistry</span>\n" +
    "    <dl>\n" +
    "      <dd>{{card.stereochemistry}}</dd>\n" +
    "    </dl>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("../app/partials/card-game.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/card-game.html",
    "<div class=\"container\">\n" +
    "  <div class=\"row\">\n" +
    "    <div id=\"gameButton\">\n" +
    "     <input class=\"btn btn-primary btn-lg\" type=\"button\" \n" +
    "     onfocus=\"$('.flipped').trigger('click');\" \n" +
    "     ng-click='getRandomCard()' value=\"New Card\">\n" +
    "   </div>\n" +
    " </div>\n" +
    " <div class=\"row\">\n" +
    "  <div class=\"col-md-3\"></div>\n" +
    "  <div class=\"col-md-6\">\n" +
    "\n" +
    "\n" +
    "    <div class=\"flip\" ng-if=\"randomCard\"> \n" +
    "      <div class=\"card\" ng-class=\"{flipped:isFlipped}\" ng-click=\"isFlipped=!isFlipped\"> \n" +
    "        \n" +
    "        <div id=\"cardFront\" class=\"face front\"> \n" +
    "         <h3>{{randomCard.name.toUpperCase()}}</h3>\n" +
    "         <div class=\"cardQuestion\">\n" +
    "           <div class=\"cardSource\">\n" +
    "             <img class=\"cardTease\" src=\"img/cards/1-methylcyclohexene.png\" alt=\"{{randomCard.name}}\">\n" +
    "           </div>\n" +
    "           <div class=\"cardReaction\">\n" +
    "             {{randomCard.reactant}}\n" +
    "             <br/>\n" +
    "             <img  src=\"img/cards/right-arrow.png\" width=\"50\">\n" +
    "             <br/>\n" +
    "             {{randomCard.solvent}}\n" +
    "           </div>\n" +
    "         </div>\n" +
    "       </div> \n" +
    "\n" +
    "\n" +
    "       <div id=\"cardBack\" class=\"face back\"> \n" +
    "         <div class=\"cardInfo\">\n" +
    "          <img class=\"cardGameImage\" ng-src=\"{{randomCard.imageUrl}}\" alt=\"{{randomCard.name}}\">\n" +
    "          <br/>\n" +
    "        </div>\n" +
    "        <div class=\"cardInfo\">\n" +
    "          <b>Type</b>\n" +
    "          {{randomCard.type}}\n" +
    "          <br/>\n" +
    "          <b>Regioselectivity</b>\n" +
    "          {{randomCard.regiochemistry}}\n" +
    "          <br/>\n" +
    "          <b>Stereoselectivity</b>\n" +
    "          {{randomCard.stereochemistry}}\n" +
    "          <span ng-if=\"randomCard.notes\">\n" +
    "            <br/>\n" +
    "            <b>Notes</b>\n" +
    "            {{randomCard.notes}}\n" +
    "          </span>\n" +
    "        </div><!-- end cardInfo -->\n" +
    "      </div> <!-- end cardBack -->\n" +
    "\n" +
    "    </div> <!-- end card -->\n" +
    "  </div> <!-- end flip -->\n" +
    "\n" +
    "  \n" +
    "</div> <!-- end col -->\n" +
    "<div class=\"col-md-3\" ></div>\n" +
    "</div> <!-- end row -->\n" +
    "</div><!-- end container -->\n" +
    "\n" +
    "");
}]);

angular.module("../app/partials/card-list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/card-list.html",
    "<div class=\"container\">\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-10\">\n" +
    "      <!--Body content-->\n" +
    "\n" +
    "      <ul class=\"cards\">\n" +
    "\n" +
    "        <li ng-repeat=\"card in cards | filter:query | orderBy:orderProp\"\n" +
    "        class=\"thumbnail card-listing\">\n" +
    "        <div class=\"flip\"> \n" +
    "\n" +
    "          <div class=\"card\" ng-class=\"{flipped:isFlipped}\" ng-click=\"isFlipped=!isFlipped\"> \n" +
    "\n" +
    "            <div id=\"cardFront\" class=\"face front\"> \n" +
    "             <h3>{{card.name.toUpperCase()}}</h3>\n" +
    "             <div class=\"cardQuestion\">\n" +
    "               <div class=\"cardSource\">\n" +
    "                 <img class=\"cardTease\" src=\"img/cards/1-methylcyclohexene.png\" alt=\"{{card.name}}\">\n" +
    "               </div>\n" +
    "               <div class=\"cardReaction\">\n" +
    "                 {{card.reactant}}\n" +
    "                 <br/>\n" +
    "                 <img  src=\"img/cards/right-arrow.png\" width=\"50\">\n" +
    "                 <br/>\n" +
    "                 {{card.solvent}}\n" +
    "               </div>\n" +
    "             </div>\n" +
    "             \n" +
    "           </div> \n" +
    "\n" +
    "           <div class=\"face back\"> \n" +
    "             <div class=\"cardInfo\">\n" +
    "              <img class=\"cardGameImage\" ng-src=\"{{card.imageUrl}}\" alt=\"{{card.name}}\">\n" +
    "              <br/>\n" +
    "            </div>\n" +
    "            <div class=\"cardInfo\">\n" +
    "              <b>Regioselectivity</b>\n" +
    "              {{card.regiochemistry}}\n" +
    "              <b>Stereoselectivity</b>\n" +
    "              {{card.stereochemistry}}\n" +
    "              <span ng-if=\"card.notes\">\n" +
    "                <br/>\n" +
    "                <b>Notes</b>\n" +
    "                {{card.notes}}\n" +
    "              </span>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "          </div> <!-- end card -->\n" +
    "        </div> <!-- end flip -->\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-2\">\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/flashcard.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/flashcard.html",
    "<div class=\"flip\" ng-if=\"randomCard\"> \n" +
    "  <div class=\"card\" ng-class=\"{flipped:isFlipped}\" ng-click=\"isFlipped=!isFlipped\"> \n" +
    "  \n" +
    "    <div id=\"cardFront\" class=\"face front\"> \n" +
    "     <h3>{{randomCard.name.toUpperCase()}}</h3>\n" +
    "     <div class=\"cardQuestion\">\n" +
    "       <div class=\"cardSource\">\n" +
    "         <img class=\"cardTease\" src=\"img/cards/1-methylcyclohexene.png\" alt=\"{{randomCard.name}}\">\n" +
    "       </div>\n" +
    "       <div class=\"cardReaction\">\n" +
    "         {{randomCard.reactant}}\n" +
    "         <br/>\n" +
    "         <img  src=\"img/cards/right-arrow.png\" width=\"50\">\n" +
    "         <br/>\n" +
    "         {{randomCard.solvent}}\n" +
    "       </div>\n" +
    "     </div>\n" +
    "   </div> \n" +
    "\n" +
    "\n" +
    "   <div id=\"cardBack\" class=\"face back\"> \n" +
    "     <div class=\"cardInfo\">\n" +
    "      <img class=\"cardGameImage\" ng-src=\"{{randomCard.imageUrl}}\" alt=\"{{randomCard.name}}\">\n" +
    "      <br/>\n" +
    "    </div>\n" +
    "    <div class=\"cardInfo\">\n" +
    "      <b>Type</b>\n" +
    "      {{randomCard.type}}\n" +
    "      <br/>\n" +
    "      <b>Regioselectivity</b>\n" +
    "      {{randomCard.regiochemistry}}\n" +
    "      <br/>\n" +
    "      <b>Stereoselectivity</b>\n" +
    "      {{randomCard.stereochemistry}}\n" +
    "      <span ng-if=\"randomCard.notes\">\n" +
    "        <br/>\n" +
    "        <b>Notes</b>\n" +
    "        {{randomCard.notes}}\n" +
    "      </span>\n" +
    "    </div><!-- end cardInfo -->\n" +
    "  </div> <!-- end cardBack -->\n" +
    "\n" +
    " </div> <!-- end card -->\n" +
    "</div> <!-- end flip -->");
}]);
