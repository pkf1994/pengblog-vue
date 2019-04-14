import SparkMD5 from 'spark-md5'

export const GenerateFeatureColor = (md5String) => {

    const firtCharOfMd5 = SparkMD5.hash(md5String).substring(0,1)

    if(48 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 51){
        return '#669966'
    }
    if(52 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 55){
        return '#A25E5E'
    }
    if(56 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 57){
        return '#5E79A2'
    }
    if(97 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 100){
        return '#A2875E'
    }
    if(101 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 104){
        return '#7B6699'
    }
    if(105 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 108){
        return '#A25E6B'
    }
    if(109 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 112){
        return '#AA5588'
    }
    if(113 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 116){
        return '#5EA2A2'
    }
    if(117 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 120){
        return '#AA9955'
    }
    if(121 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 122){
        return '#5EA25E'
    }
}

