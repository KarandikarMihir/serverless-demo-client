import {
    StorageURL, 
    AnonymousCredential,
    ServiceURL,
    uploadBrowserDataToBlockBlob,
    Aborter,
    ContainerURL,
    BlobURL,
    BlockBlobURL
} from "@azure/storage-blob";

const account = {
    name: 'harbingerstorageacc',
    sas:  '?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-01-22T01:09:57Z&st=2019-01-21T17:09:57Z&spr=https&sig=3IwsbE5T2JWLYL%2B9W31q8MR2iHlv67ujPCURiif%2FyJ0%3D'
};

const pipeline = StorageURL.newPipeline(new AnonymousCredential(), {
    retryOptions: { maxTries: 4 }, // Retry options
    telemetry: { value: "HighLevelSample V1.0.0" } // Customized telemetry string
});

const serviceURL = new ServiceURL(
    `https://${account.name}.blob.core.windows.net${account.sas}`,
    pipeline
);

// Create a container
const containerName = 'images';
const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);

export default (file) => {
    const blobName = file.name;
    const blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
    
    return uploadBrowserDataToBlockBlob(Aborter.none, file, blockBlobURL, {
        blockSize: 4 * 1024 * 1024, // 4MB block size
        parallelism: 20, // 20 concurrency
        progress: ev => console.log(ev)
      });
}
