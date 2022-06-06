Class

SKAdNetwork
===========

A class that validates advertisement-driven app installations.

iOS 11.3+ iPadOS 11.3+ Mac Catalyst 13.1+

Declaration
-----------

    class SKAdNetwork : NSObject

Overview
--------

The ad network API helps advertisers measure the success of ad campaigns while maintaining user privacy. The API involves three participants:

*   _Ad networks_ that sign ads and receive install-validation postbacks after ads result in conversions
    
*   _Source apps_ that display ads provided by the ad networks
    
*   _Advertised apps_ that appear in the signed ads
    

Ad networks must register with Apple, and developers must configure their apps to work with ad networks. For information about set up, see [Registering an Ad Network](/documentation/storekit/skadnetwork/registering_an_ad_network), [Configuring a Source App](/documentation/storekit/skadnetwork/configuring_a_source_app), and [Configuring an Advertised App](/documentation/storekit/skadnetwork/configuring_an_advertised_app).

The following diagram describes the path of an install validation for a StoreKit-rendered ad. App A is the source app that displays an ad. App B is the advertised app that the user installs.

![A diagram showing a user tapping an ad for App B inside of App A, then installing and launching App B. App B calls the updatePostbackConversionValue method, which triggers a conversion notification and starts the timer. After the timer expires, the ad network receives the postback which it must verify.](https://docs-assets.developer.apple.com/published/3b67140452/rendered2x-1642033157.png)

When users tap an ad, advertisers display an ad with cryptographically signed parameters that identify the ad campaign. Starting in iOS 14.5, advertisers can choose to display a custom view-through ad or a StoreKit-rendered ad. If the user installs the advertised app within an attribution time-window, the device sends an install attribution postback to the ad network.

Starting in iOS 14.6, devices send install-validation postbacks to multiple ad networks that sign their ads using version 3.0.

*   One ad network receives a postback with a `did-win` parameter value of `true` for the ad impression that wins the ad attribution.
    
*   Up to five other ad networks receive a postback with a `did-win` parameter value of `false` if their ad impressions qualified for the attribution, but didn’t win.
    

Starting in iOS 15, developers of advertised apps can opt-in to get copies of the winning postbacks that represent successful ad conversions for their app. To opt-in, configure a postback URL in your app. For more information see [Configuring an Advertised App](/documentation/storekit/skadnetwork/configuring_an_advertised_app).

For more information about receiving attribution, including time-window details and other constraints, see [Receiving Ad Attributions and Postbacks](/documentation/storekit/skadnetwork/receiving_ad_attributions_and_postbacks).

The information in the postback that’s cryptographically signed by Apple includes the campaign ID, but doesn’t include user- or device-specific data. The postback may include a conversion value and the source app’s ID if Apple determines that providing the values meets Apple’s privacy threshold. Starting with SKAdNetwork version 3.0, postbacks include a `did-win` flag to indicate whether the ad network won the attribution. For more information about postbacks, see [Verifying an Install-Validation Postback](/documentation/storekit/skadnetwork/verifying_an_install-validation_postback).

### Presenting Ads and Receiving Attribution

Each participant has specific responsibilities when using the ad network APIs to present ads and receive attribution.

The ad network’s responsibilities are to:

1.  Register and provide its ad network identifier to developers. See [Registering an Ad Network](/documentation/storekit/skadnetwork/registering_an_ad_network).
    
2.  Provide signed ads to the source app. See [Signing and Providing Ads](/documentation/storekit/skadnetwork/signing_and_providing_ads).
    
3.  Receive install-validation postbacks at the URL it established during registration.
    
4.  Verify the postbacks. See [Verifying an Install-Validation Postback](/documentation/storekit/skadnetwork/verifying_an_install-validation_postback).
    

The source app’s responsibilities are to:

1.  Add the ad network identifiers to its `Info.plist`. See [Configuring a Source App](/documentation/storekit/skadnetwork/configuring_a_source_app).
    
2.  Display ads that the ad network signs. See [Signing and Providing Ads](/documentation/storekit/skadnetwork/signing_and_providing_ads).
    

The advertised app’s responsibilities are to:

1.  Register an app installation by calling [`registerAppForAdNetworkAttribution()`](/documentation/storekit/skadnetwork/2943654-registerappforadnetworkattributi) or [`updateConversionValue(_:)`](/documentation/storekit/skadnetwork/3566697-updateconversionvalue).
    
2.  Optionally, update a conversion value by calling [`updateConversionValue(_:)`](/documentation/storekit/skadnetwork/3566697-updateconversionvalue).
    
3.  Optionally, specify a server URL in its `Info.plist` to receive a copy of the winning install-validation postback. See [Configuring an Advertised App](/documentation/storekit/skadnetwork/configuring_an_advertised_app).
    

SKAdNetwork APIs are designed to maintain user privacy. Apps don’t need to use [App Tracking Transparency](/documentation/apptrackingtransparency) before calling SKAdNetwork APIs, and can call these APIs regardless of their tracking authorization status. For more information about privacy, see [User Privacy and Data Use](https://developer.apple.com/app-store/user-privacy-and-data-use/).

Note

When you call APIs provided by `SKAdNetwork` from an App Clip’s code, these APIs have no effect, return empty strings, or return values that indicate unavailability. For more information about App Clips, see [Choosing the right functionality for your App Clip](/documentation/app_clips/choosing_the_right_functionality_for_your_app_clip).

Topics
------

### Essentials

[

Signing and Providing Ads](/documentation/storekit/skadnetwork/signing_and_providing_ads)

Advertise apps by signing and providing StoreKit-rendered ads or view-through ads.

[

Receiving Ad Attributions and Postbacks](/documentation/storekit/skadnetwork/receiving_ad_attributions_and_postbacks)

Learn about timeframes and priorities for ad impressions that result in ad attributions, and how additional impressions qualify for postbacks.

[

SKAdNetwork Release Notes](/documentation/storekit/skadnetwork/skadnetwork_release_notes)

Learn about the features in each SKAdNetwork version.

### Registering Ad Networks and Configuring Apps

[

Registering an Ad Network](/documentation/storekit/skadnetwork/registering_an_ad_network)

Register your ad network with Apple to use the install-validation APIs for your ad campaigns.

[

Configuring a Source App](/documentation/storekit/skadnetwork/configuring_a_source_app)

Configure a source app to participate in ad campaigns.

[

Configuring an Advertised App](/documentation/storekit/skadnetwork/configuring_an_advertised_app)

Prepare an advertised app to participate in ad campaigns.

[`property list key SKAdNetworkItems`](/documentation/bundleresources/information_property_list/skadnetworkitems)

An array of dictionaries containing a list of ad network identifiers.

[`property list key NSAdvertisingAttributionReportEndpoint`](/documentation/bundleresources/information_property_list/nsadvertisingattributionreportendpoint)

The URL where Private Click Measurement and SKAdNetwork send attribution information.

### Signing StoreKit-Rendered Ads

[

Generating the Signature to Validate StoreKit-Rendered Ads](/documentation/storekit/skadnetwork/generating_the_signature_to_validate_storekit-rendered_ads)

Initiate install validation by displaying a StoreKit-rendered ad with signed parameters.

[

API Reference

Ad Network Install-Validation Keys](/documentation/storekit/skadnetwork/ad_network_install-validation_keys)

Specify key values that validate and associate an app installation with an ad campaign.

### Signing View-Through Ads

[

Generating the Signature to Validate View-Through Ads](/documentation/storekit/skadnetwork/generating_the_signature_to_validate_view-through_ads)

Initiate install validation by displaying a view-through ad with signed parameters.

[`class SKAdImpression`](/documentation/storekit/skadimpression)

A class that defines an ad impression for a view-through ad.

[`class func startImpression(SKAdImpression, completionHandler: ((Error?) -> Void)?)`](/documentation/storekit/skadnetwork/3727304-startimpression)

Indicates that your app is presenting a view-through ad to the user.

[`class func endImpression(SKAdImpression, completionHandler: ((Error?) -> Void)?)`](/documentation/storekit/skadnetwork/3727303-endimpression)

Indicates that your app is no longer presenting a view-through ad to the user.

### Providing Conversion Information

[`class func updatePostbackConversionValue(Int, completionHandler: ((Error?) -> Void)?)`](/documentation/storekit/skadnetwork/3919928-updatepostbackconversionvalue)

Verifies the first launch of an advertised app and on subsequent calls, updates the conversion value or calls a completion hander if the update fails.

[`class func registerAppForAdNetworkAttribution()`](/documentation/storekit/skadnetwork/2943654-registerappforadnetworkattributi)

Verifies the first launch of an app installed as a result of an ad.

Deprecated

[`class func updateConversionValue(Int)`](/documentation/storekit/skadnetwork/3566697-updateconversionvalue)

Updates the conversion value and verifies the first launch of an app installed as a result of an ad.

Deprecated

### Verifying Postbacks

[

Verifying an Install-Validation Postback](/documentation/storekit/skadnetwork/verifying_an_install-validation_postback)

Verify that a postback you receive after an ad conversion is cryptographically signed by Apple.

### Testing Ad Attributions and Postbacks

[

Testing Ad Attributions with a Downloaded Profile](/documentation/storekit/skadnetwork/testing_ad_attributions_with_a_downloaded_profile)

Reduce the time window for ad attributions and inspect postbacks using a proxy during testing.

[

Testing and Validating Ad Impression Signatures and Postbacks for SKAdNetwork](/documentation/storekittest/testing_and_validating_ad_impression_signatures_and_postbacks_for_skadnetwork)

Validate your ad impressions and test your postbacks by creating unit tests using the StoreKit Test framework.

Relationships
-------------

### Inherits From

*   [`NSObject`](/documentation/objectivec/nsobject)

See Also
--------

### Ad network attribution

[`class SKAdImpression`](/documentation/storekit/skadimpression)

A class that defines an ad impression for a view-through ad.

[`enum SKANError.Code`](/documentation/storekit/skanerror/code)

Constants that indicate the type of error for an ad network attribution operation.

[`struct SKANError`](/documentation/storekit/skanerror)

An error that an ad network attribution operation returns.

[`let SKANErrorDomain: String`](/documentation/storekit/skanerrordomain)

A string that identifies the SKAdNetwork error domain.
