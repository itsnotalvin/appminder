import { ResponsivePie } from '@nivo/pie';
export const ProfileView = ({ data }) => {
    return (
        <>
            <header id='application-bar'>
                <h2>Profile</h2>
            </header>

            <div id='applications-display'>
                <ResponsivePie
                    data={data}
                    margin={{ top: 40, right: 60, bottom: 80, left: 60 }}
                    innerRadius={0.1}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.2
                            ]
                        ]
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsStraightLength={8}
                    arcLinkLabelsDiagonalLength={8}
                    arcLinkLabelsTextOffset={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                2
                            ]
                        ]
                    }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    fill={[
                        {
                            match: {
                                id: 'Draft'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'Applied'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'Interviewing'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'Awaiting'
                            },
                            id: 'lines'
                        },
                    ]}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'column',
                            justify: false,
                            translateX: 75,
                            translateY: 75,
                            itemsSpacing: 5,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: '#999',
                            itemDirection: 'left-to-right',
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
        </>
    )
};
