webpackJsonpac__name_([0],{

/***/ "./src/app/+detail/detail.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var DetailComponent = (function () {
    function DetailComponent() {
    }
    DetailComponent.prototype.ngOnInit = function () {
        console.log('hello `Detail` component');
    };
    DetailComponent = __decorate([
        core_1.Component({
            selector: 'detail',
            template: "\n    <h1>Hello from Detail</h1>\n    <router-outlet></router-outlet>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], DetailComponent);
    return DetailComponent;
}());
exports.DetailComponent = DetailComponent;


/***/ },

/***/ "./src/app/+detail/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var detail_component_1 = __webpack_require__("./src/app/+detail/detail.component.ts");
console.log('`Detail` bundle loaded asynchronously');
// async components must be named routes for WebpackAsyncRoute
exports.routes = [
    { path: '', component: detail_component_1.DetailComponent, pathMatch: 'full' }
];
var AboutModule = (function () {
    function AboutModule() {
    }
    AboutModule.routes = exports.routes;
    AboutModule = __decorate([
        core_1.NgModule({
            declarations: [
                // Components / Directives/ Pipes
                detail_component_1.DetailComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes),
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AboutModule);
    return AboutModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AboutModule;


/***/ }

});
//# sourceMappingURL=0.map