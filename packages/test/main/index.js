import { AsyncManager} from "@func-js/async";
import {give} from "@func-js/core";

export const func = AsyncManager.use(function () {

});

func();

give().before(({args})=>{})