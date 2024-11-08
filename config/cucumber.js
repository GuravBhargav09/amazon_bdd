module.exports = {
    
        default: {
            tags: process.env.npm_config_TAGS || "",
            formatOptions: {
                snippetInterface: "async-await",
                resultsDir: "allure-results"
            },
            paths: [
                "./src/test/features/*.feature"
            ],
            require: [
                "./src/test/steps/*.ts",
                "./src/Hooks/hooks.ts"
    
            ],
            publishQuite: true,
            dryRun: false,
            requireModule: ["ts-node/register"],
            format: [
                "progress-bar", 
                "html:test-results/cucumber-report.html",
                "json:test-results/cucumber-report.json",
                "allure-cucumberjs/reporter"
                
            ]
            
         
    
        }
    
}