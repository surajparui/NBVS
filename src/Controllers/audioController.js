const audioController = () => {
    return {
        music: (req, res) => {
            requests(``)
                .on("data", async (chunk) => {
                    await fs.writeFile('apiData.json', chunk, () => {
                        console.log(`JSON DATA IS STORED IN THE FILE`);
                    });
                })
                .on("end", (error) => {
                    if (error) {
                        return console.log('Connection closed due to errors', err);
                    }
                });
        }
    };
};
module.exports = audioController;