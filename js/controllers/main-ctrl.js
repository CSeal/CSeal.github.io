angular.module("Metrolab", [])
    .factory("mainTemplate", function(){
    return {
        head:{
            title: 'Metrolab - метрологическая лаборатория',
            mainMenus: [{title: 'Главная',
                        url:"main",
                        haveDropDownMenu: false,
                        myBeActive: true,
                        active: true},
                {title: 'Подбор оборудования',
                    url:"",
                    haveDropDownMenu: true,
                    dropdownMenus: [{title: "Подобрать оборудование",
                        url: "select-equipment"},
                        {title: "Список оборудования",
                            url: "equipment-list"},
                        {title: "Группы оборудования",
                            url: "list-groups-equipments"}],
                    myBeActive: false,
                    active: false
                }],
            template: 'template/header.html'
        },
        content:{template: 'template/content.html'},
        footer:{template: 'template/footer.html'}
    }
})
    .factory("contentData", function(){
    return {}
}).controller("MainCtrl", function($scope, mainTemplate, ){
    let currentContainerURI = 'equipment-list';
    $scope.mainTemplate = mainTemplate;
    $scope.$parent.headTitle = $scope.mainTemplate.head.title;
    $scope.changeContent = function(scopeElement){
        if(scopeElement.url === '') {
            return;
        } // Ничего не делать когда кликнет на выподающий список.
        scopeElement.active = true;
        $scope.contentTemplateSrc = 'template/' + scopeElement.url + '.html';
         $scope.contentInfo.header.contentTitle = scopeElement.title;
        currentContainerURI = scopeElement.url;
    };
    $scope.contentInfo= {header: {
        contentTitle: $scope.mainTemplate.head.mainMenus[0].title,
        mainContainerClass: ["container", {'equipment-list': currentContainerURI === 'equipment-list',
                                        'select-equipment': currentContainerURI === 'select-equipment',
                              'list-groups-equipments': currentContainerURI === 'list-groups-equipments'}]
    }};
    $scope.contentTemplateSrc = "template/main.html";
});