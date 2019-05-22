__precompile__()

module ImageMorphology

using ImageCore
using Base.Cartesian # TODO: delete this

include("convexhull.jl")
include("connected.jl")

include("dilation_and_erosion.jl")
include("thinning.jl")

export
    dilate,
    erode,
    opening,
    closing,
    tophat,
    bothat,
    morphogradient,
    morpholaplace,

    # connected.jl
    label_components,
    label_components!,
    component_boxes,
    component_lengths,
    component_indices,
    component_subscripts,
    component_centroids,

    # convexhull.jl
    convexhull,

    # thinning.jl
    thinning,
    GuoAlgo


end # module
