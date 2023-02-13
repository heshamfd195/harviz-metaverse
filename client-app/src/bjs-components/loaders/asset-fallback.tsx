import { useContext, useRef } from "react";
import { AssetManagerContext } from "react-babylonjs";

export const MyFallback = (props: any) => {

    const boxRef: any = useRef();
    const context = useContext(AssetManagerContext);
    console.log("context in fallback:", context);
    const count = useRef(0);

    // useAfterRender((scene)=>{

    //       count.current = count.current + 1;
    //       console.log(count)
    //       if(count.current ===8){
    //         props.onMeshFallbackLoaded()

    //       }

    // })



    // useBeforeRender((scene) => {
    //   if (boxRef.current) {
    //     var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    //     const rpm = 10;
    //     boxRef.current.rotation.x = Math.PI / 4;
    //     boxRef.current.rotation.y +=
    //       (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);

    //   }
    // });

    const eventData = context?.lastProgress?.eventData;




    return (
        <>
            <adtFullscreenUi name="ui">
                <rectangle name="rect" height="50px" width="150px">
                    <rectangle>
                        {eventData !== undefined && (
                            <textBlock
                                text={`${eventData.totalCount - eventData.remainingCount}/${eventData.totalCount
                                    }`}
                                fontStyle="bold"
                                fontSize={20}
                                color="white"
                            />
                        )}
                        {eventData === undefined && (
                            <textBlock
                                text="0/2"
                                fontStyle="bold"
                                fontSize={20}
                                color="white"
                            />
                        )}

                    </rectangle>
                </rectangle>
            </adtFullscreenUi>


        </>
    );
};