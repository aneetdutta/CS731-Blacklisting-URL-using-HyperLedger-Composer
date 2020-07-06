/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.example.mynetwork.Block_Unblock} sampleTransaction
 * @transaction
 */
async function sampleTransaction(tx) {
    // Save the old value of the asset.
    //const oldValue = tx.asset.value;
    const oldStatus = tx.asset.status;
    // Update the asset with the new value.
    //tx.asset.value = tx.newValue;
    tx.asset.status = tx.newStatus;
    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.example.mynetwork.Url');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.example.mynetwork', 'SampleEvent');
    event.asset = tx.asset;
    //event.oldValue = oldValue;
    //event.newValue = tx.newValue;
    event.oldStatus = oldStatus;
    event.newStatus = tx.newStatus;
    emit(event);
}

/**
 * creates an asset
 * @param {org.example.mynetwork.CreateAsset} createAsset
 * @transaction
 */
async function CreateAsset(createAsset) {
    return getAssetRegistry('org.example.mynetwork.Url')
    .then(function(result) {
        var factory = getFactory();
        var newAsset = factory.newResource('org.example.mynetwork','Url',createAsset.asseturl.assetId); 
        newAsset.status = false;
        newAsset.name=createAsset.asseturl.name;
         newAsset.lastModified=createAsset.asseturl.lastModified;
        //continue with property assignments and any logic you have
        //when you are done and everything looks good you can continue
       
        return result.add(newAsset);
     });

  
}
