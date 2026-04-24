export namespace main {
	
	export class ConvertOptions {
	    jsonPath: string;
	    textureDir: string;
	    animationName: string;
	    outputPath: string;
	    compName: string;
	    padding: number;
	
	    static createFrom(source: any = {}) {
	        return new ConvertOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.jsonPath = source["jsonPath"];
	        this.textureDir = source["textureDir"];
	        this.animationName = source["animationName"];
	        this.outputPath = source["outputPath"];
	        this.compName = source["compName"];
	        this.padding = source["padding"];
	    }
	}
	export class ConvertResult {
	    outputPath: string;
	    scriptSize: number;
	
	    static createFrom(source: any = {}) {
	        return new ConvertResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.outputPath = source["outputPath"];
	        this.scriptSize = source["scriptSize"];
	    }
	}
	export class SpineInfo {
	    version: string;
	    boneCount: number;
	    slotCount: number;
	    animations: string[];
	    width: number;
	    height: number;
	    defaultTextureDir: string;
	    defaultOutputPath: string;
	    defaultCompName: string;
	    atlasPath: string;
	    pageImagePath: string;
	
	    static createFrom(source: any = {}) {
	        return new SpineInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.version = source["version"];
	        this.boneCount = source["boneCount"];
	        this.slotCount = source["slotCount"];
	        this.animations = source["animations"];
	        this.width = source["width"];
	        this.height = source["height"];
	        this.defaultTextureDir = source["defaultTextureDir"];
	        this.defaultOutputPath = source["defaultOutputPath"];
	        this.defaultCompName = source["defaultCompName"];
	        this.atlasPath = source["atlasPath"];
	        this.pageImagePath = source["pageImagePath"];
	    }
	}
	export class UnpackResult {
	    outputDir: string;
	    regionCount: number;
	
	    static createFrom(source: any = {}) {
	        return new UnpackResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.outputDir = source["outputDir"];
	        this.regionCount = source["regionCount"];
	    }
	}

}

