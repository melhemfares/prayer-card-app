import {
    StyleSheet
} from "react-native";

import {
    COLOURS,
    FONT,
    SIZES
} from "../constants";

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        paddingTop: 10
    },
    searchBox: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        margin: SIZES.medium
    },
    header: {
        margin: SIZES.small,
        fontSize: SIZES.xLarge,
        textAlign: 'center',
        fontFamily: 'DMBold',
    },
    prayer: {
        marginTop: SIZES.medium,
        textAlign: 'center',
        fontFamily: 'DMRegular',
        lineHeight: 16
    },
    settingTab: {
        padding: SIZES.large,
        marginTop: 1,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 1
    },
    setting: {
        fontSize: SIZES.medium,
        color: COLOURS.primary,
        flex: 1
    },
    card: {
        height: 250,
        width: '100%',
        borderWidth: 8,
        borderColor: COLOURS.tertiary,
        borderRadius: 2,
        elevation: 3
    },
    cardView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        margin: '10%',
        borderWidth: 12,
        borderColor: COLOURS.tertiary,
        borderRadius: 3,
        elevation: 3
    },
    xButton: {
        position: 'absolute',
        right: -3,
        top: -3,
        zIndex: 3,
        width: 30,
        height: 30,
        borderRadius: 100,
        backgroundColor: 'red',
        borderWidth: 4,
        borderColor: COLOURS.white
    },
    plusButton: {
        position: 'absolute',
        right: -3,
        top: -3,
        zIndex: 3,
        width: 30,
        height: 30,
        borderRadius: 100,
        backgroundColor: COLOURS.primary,
        borderWidth: 4,
        borderColor: COLOURS.white
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    nameField: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderColor: COLOURS.gray2,
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 4,
        marginBottom: 14
    },
    prayerField: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderColor: COLOURS.gray2,
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 4,
        marginBottom: 14,
        textAlignVertical: 'top'
    },
    grayText: {
        textAlign: 'center',
        color: COLOURS.gray,
        marginTop: '50%'
    },
    imagePreview: {
        alignContent: 'center',
        width: 120,
        height: 200,
        margin: 25
    },
    imagePreviewView: {
        alignItems: 'center',
        borderColor: COLOURS.gray2,
        borderWidth: 1,
        borderRadius: 4,
        marginVertical: 10,
        width: '100%',
        height: 250
    },
    button: {
        flex: 1,
        padding: 10,
    },
    rows: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default styles;